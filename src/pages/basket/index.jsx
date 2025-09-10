import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBasket,
  updateQuantity,
} from "../../redux/slices/basketSlice";
import BasketForm from "../../components/basketForm";
import BasketModal from "../../components/basketModal";
import styles from "./basket.module.css";
import { Link, NavLink } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";

export default function Basket() {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = (id) => dispatch(removeFromBasket(id));
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const totalPrice = basket.reduce(
    (acc, item) => acc + (item.discont_price || item.price) * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.shoppingCartHeader}>
        <h1 className={styles.pageTitle}>Shopping Cart</h1>
        <div className={styles.backButtonWrapper}>
          <span className={styles.conectionLine}></span>
          <NavLink to="/products" className={styles.link}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#7575753a",
                borderRadius: "6px",
                fontSize: "16px",
                color: "#757575",
                width: "170px",
                padding: 0,
                height: "36px",
                textTransform: "none",
                whiteSpace: "nowrap",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Back to the Store
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          {basket.length > 0 ? (
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
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemove(item.id)}
                    >
                      <ClearIcon fontSize="inherit" />
                    </button>

                    <h2 className={styles.productTitle}>{item.title}</h2>

                    <div className={styles.quantityPriceRow}>
                      <div className={styles.quantityControl}>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span className={styles.quantityNumber}>
                          {item.quantity}
                        </span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className={styles.priceBlock}>
                        {item.discont_price ? (
                          <>
                            <span className={styles.discountPrice}>
                              ${item.discont_price}
                            </span>
                            <span className={styles.normalPrice}>
                              ${item.price}
                            </span>
                          </>
                        ) : (
                          <span className={styles.normalPrice}>
                            ${item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyBasketContainer}>
              <p className={styles.emptyBasketText}>
                Looks like you have no items in your basket currently.
              </p>
              <Link to="/products">
                <button className={styles.continueButton}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
        </div>

        {basket.length > 0 && (
          <div className={styles.rightSide}>
            <BasketForm
              totalPrice={totalPrice}
              totalItems={basket.length}
              onOrderSuccess={handleOpenModal}
            />
          </div>
        )}
      </div>

      <BasketModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
