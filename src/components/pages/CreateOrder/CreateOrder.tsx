import { useEffect, useState, type FormEvent } from "react";
import styles from "./CreateOrder.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { ICard, IMenu } from "../../../types/order";
import { getMenus } from "../../../services/menu.service";
import { filters, tables } from "./CreateOrder.constants";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Select from "../../atoms/Select";
import { createOrder } from "../../../services/order.service";

const CreateOrder = () => {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [carts, setCarts] = useState<ICard[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getMenus(category, debouncedSearch);
      setMenus(result.data);
    };
    fetchOrder();
  }, [category, debouncedSearch]);

  const handleAddToCart = (type: string, id: string, name: string) => {
    const itemIsInCart = carts.find((item: ICard) => item.menuId === id);
    if (type === "increment") {
      if (itemIsInCart) {
        setCarts(
          carts.map((item: ICard) =>
            item.menuId === id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setCarts([
          ...carts,
          {
            menuId: id,
            name,
            quantity: 1,
            notes: "",
          },
        ]);
      }
    } else {
      if (itemIsInCart && itemIsInCart.quantity <= 1) {
        setCarts(carts.filter((item: ICard) => item.menuId !== id));
      } else {
        setCarts(
          carts.map((item: ICard) =>
            item.menuId === id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        );
      }
    }
  };

  const navigate = useNavigate();

  const handleOrder = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      customerName: form.customerName.value,
      tableNumber: form.tableNumber.value,
      cart: carts.map((item: ICard) => ({
        menuItemId: item.menuId,
        quantity: item.quantity,
        notes: "",
      })),
    };
    await createOrder(payload);
    return navigate("/orders");
  };

  return (
    <main className={styles.create}>
      <div className={styles.menu}>
        <h1>Explore Our Best Menu</h1>
        <Input
          id="search"
          name="search"
          placeholder="Cari menu makanan/minuman..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button
              type="button"
              color={
                (!searchParams.get("category") && filter === "All") ||
                filter === searchParams.get("category")
                  ? "primary"
                  : "secondary"
              }
              key={filter}
              onClick={() =>
                setSearchParams(filter === "All" ? {} : { category: filter })
              }
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className={styles.list}>
          {menus.length > 0 ? (
            menus.map((item: IMenu) => (
              <div className={styles.item} key={item.id}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  loading="lazy"
                  className={styles.image}
                />
                <h2>{item.name}</h2>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.bottom}>
                  <p className={styles.price}>${item.price}</p>
                  <Button
                    onClick={() =>
                      handleAddToCart("increment", `${item.id}`, `${item.name}`)
                    }
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.empty}>
              <p>Menu "{search}" tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>
      <form className={styles.form} onSubmit={handleOrder}>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Customer Information</h2>
            <Link to="/orders">
              <Button color="secondary">Cancel</Button>
            </Link>
          </div>
          <div className={styles.input}>
            <Input
              id="name"
              label="Name"
              name="customerName"
              placeholder="Insert Name"
              required
            />
            <Select
              id="table"
              label="Table Number"
              name="tableNumber"
              options={tables}
              required
            />
          </div>
        </div>
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Current Order</h2>
          </div>
          {carts.length > 0 ? (
            <div className={styles.cart}>
              {carts.map((item: ICard) => (
                <div className={styles.item} key={item.menuId}>
                  <h4 className={styles.name}>{item.name}</h4>
                  <div className={styles.quantity}>
                    <Button
                      onClick={() =>
                        handleAddToCart(
                          "decrement",
                          `${item.menuId}`,
                          `${item.name}`,
                        )
                      }
                      color="secondary"
                    >
                      -
                    </Button>
                    <div className={styles.Number}>{item.quantity}</div>
                    <Button
                      onClick={() =>
                        handleAddToCart(
                          "increment",
                          `${item.menuId}`,
                          `${item.name}`,
                        )
                      }
                      color="secondary"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <Button type="submit">Order</Button>
            </div>
          ) : (
            <div className={styles.cart}>
              <h4>Cart is empty</h4>
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default CreateOrder;
