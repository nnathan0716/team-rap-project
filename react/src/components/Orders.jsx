import { useStoreInfo } from "../hooks/StoreContext";

const Orders = () => {
  const { orders, setOrders } = useStoreInfo();

  return (
    <div>
      {orders.map((order) => (
        <div key={order}>{order}</div>
      ))}
    </div>
  );
};

export default Orders;
