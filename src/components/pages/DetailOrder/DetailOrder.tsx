import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ICard, IOrder } from "../../../types/order";
import { getOrderById } from "../../../services/order.service";
import styles from "./DetailOrder.module.css";
import Button from "../../atoms/Button";

const DetailOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrderById(`${id}`);
      setOrder(result);
    };
    fetchOrder();
  }, []);

  if (!order) {
    return (
      <main className={styles.detail}>
        <div className={styles.loading}>
          <p>Memuat detail pesanan...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.detail}>
      <section className={styles.header}>
        <div>
          <h1>Detail Pesanan</h1>
          <p className={styles.orderSubtitle}>
            Rincian pesanan dan status pembayaran
          </p>
        </div>
        <Link to="/orders">
          <Button color="secondary">Kembali</Button>
        </Link>
      </section>

      <section className={styles.order}>
        <div className={styles.info}>
          <h3 className={styles.cardTitle}>Ringkasan</h3>

          <div className={styles.infoRow}>
            <span>Order ID</span>
            <span className={styles.orderId}>{order.id}</span>
          </div>

          <div className={styles.infoRow}>
            <span>Pelanggan</span>
            <strong>{order.customer_name}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>No. Meja</span>
            <span className={styles.tableBadge}>Meja {order.table_number}</span>
          </div>

          <div className={styles.infoRow}>
            <span>Status</span>
            <span
              className={`${styles.statusBadge} ${
                order.status === "COMPLETED"
                  ? styles.statusCompleted
                  : styles.statusProcessing
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className={styles.totalRow}>
            <span>Total Tagihan</span>
            <span className={styles.totalPrice}>
              Rp {Number(order.total).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>
            Item Dipesan ({order.cart?.length || 0})
          </h3>
          <div className={styles.cartList}>
            {order.cart?.map((item: ICard) => (
              <div className={styles.cartItem} key={item.menuId}>
                <img
                  className={styles.image}
                  src={item.menuItem?.image_url}
                  alt={item.menuItem?.name}
                />

                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.menuItem?.name}</h4>
                  <div className={styles.itemMeta}>
                    <span className={styles.qtyBadge}>{item.quantity}x</span>
                    <span className={styles.unitPrice}>
                      @ ${" "}
                      {Number(item.menuItem?.price || 0).toLocaleString(
                        "en",
                      )}
                    </span>
                  </div>
                  {item.notes && <p className={styles.notes}>"{item.notes}"</p>}
                </div>

                <div className={styles.itemSubtotal}>
                  <span>Subtotal</span>
                  <strong>
                    ${" "}
                    {(
                      Number(item.menuItem?.price || 0) * item.quantity
                    ).toLocaleString("en")}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetailOrder;
