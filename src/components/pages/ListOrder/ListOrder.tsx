import { useEffect, useState } from "react";
import styles from "./ListOrder.module.css";
import { getOrders, updateOrder } from "../../../services/order.service";
import Button from "../../atoms/Button";
import { Link, useNavigate } from "react-router-dom";
import type { IOrder } from "../../../types/order";
import { removeLocalStorage } from "../../../utils/storage";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
  const [refetchOrder, setRefectchOrder] = useState(true);

  useEffect(() => {
    if (refetchOrder) {
      const fetchOrder = async () => {
        const result = await getOrders();
        setOrders(result?.data || []);
      };
      fetchOrder();
      setRefectchOrder(false);
    }
  }, [refetchOrder]);

  const handleCompletedOrder = async (id: string) => {
    await updateOrder(id, { status: "COMPLETED" }).then(() => {
      setRefectchOrder(true);
    });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    removeLocalStorage("auth");
    return navigate("/login");
  };

  return (
    <main className={styles.order}>
      <section className={styles.header}>
        <h1 className={styles.title}>Order List</h1>
        <div className={styles.button}>
          <Link to="/create">
            <Button>Create Order</Button>
          </Link>
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>
      <section>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Customer Name</th>
              <th>Table</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: IOrder, index: number) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer_name}</td>
                <td>{order.table_number}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td className={styles.action}>
                  <Link to={`${order.id}`}>
                    <Button>Detail</Button>
                  </Link>
                  {order.status === "PROCESSING" && (
                    <Button onClick={() => handleCompletedOrder(order.id)}>
                      Completed
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default ListOrder;
