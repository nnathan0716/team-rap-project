import { useStoreInfo } from "../hooks/StoreContext";
import CartView from "./CartView";

const Checkout = () => {
  const { cart, setCart } = useStoreInfo();

  return (
    <>
      <CartView />
    </>
  );
};

export default Checkout;
