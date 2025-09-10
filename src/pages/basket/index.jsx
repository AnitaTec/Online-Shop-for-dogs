import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBasket,
  updateQuantity,
} from "../../redux/slices/basketSlice";
import BasketForm from "../../components/basketForm";
import styles from "./basket.module.css";

export default function Basket() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items || []);

  const handleRemove = (id) => dispatch(removeFromBasket(id));
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = basket.reduce(
    (acc, item) => acc + (item.discont_price || item.price) * item.quantity,
    0
  );

  if (!basket.length) {
    return <h1 className={styles.emptyBasket}>Your Basket is Empty</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          <h1 className={styles.pageTitle}>Shopping Cart</h1>
          <div className={styles.basketItems}>
            {basket.map((item) => (
              <div key={item.id} className={styles.basketItem}>
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `http://localhost:3333${item.image}`
                  }
                  alt={item.title}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <h2>{item.title}</h2>
                  <div className={styles.priceBlock}>
                    <span>
                      Price: ${item.discont_price || item.price} x{" "}
                      {item.quantity}
                    </span>
                    <span>
                      Total: $
                      {(item.discont_price || item.price) * item.quantity}
                    </span>
                  </div>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantityNumber}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemove(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightSide}>
          <BasketForm totalPrice={totalPrice} totalItems={basket.length} />
        </div>
      </div>
    </div>
  );
}
