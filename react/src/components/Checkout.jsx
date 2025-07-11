import { useStoreInfo } from "../hooks/StoreContext";

const Checkout = () => {
  const { cart, setCart } = useStoreInfo();

  return (
    <>
      <div>
        {cart.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
};

export default Checkout;
