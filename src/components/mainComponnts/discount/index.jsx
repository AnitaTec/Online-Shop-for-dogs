import styles from "./discounts.module.css";
import { Button } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../../redux/slices/basketSlice";

export default function Sales() {
  const { BASE_URL } = useContext(AppContext);
  const [sales, setSales] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/all`)
      .then((response) => {
        const randomSales = response.data
          .filter(
            (item) =>
              item.discont_price !== null && item.discont_price !== undefined
          )
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
          .map((item) => ({
            ...item,
            image: item.image.startsWith("http")
              ? item.image
              : `${BASE_URL}${item.image}`,
          }));
        setSales(randomSales);
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, [BASE_URL]);

  const getDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return null;
    return Math.round(((price - discountPrice) / price) * 100);
  };

  const handleAddToBasket = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToBasket({ ...product, quantity: 1 }));
  };

  return (
    <div className={styles.salesSection}>
      <div className={styles.salesHeaderWrapper}>
        <h3 className={styles.salesTitle}>Sale</h3>
        <div className={styles.salesHeaderRow}>
          <div className={styles.salesLine}></div>
          <NavLink to="/sales" className={styles.salesLink}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#7575753a",
                borderRadius: "6px",
                fontSize: "16px",
                color: "#757575",
                height: "36px",
                textTransform: "none",
                whiteSpace: "nowrap",
                width: "97px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              All Sales
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.salesGrid}>
        {sales.map((item) => {
          const discountPercent = getDiscountPercent(
            item.price,
            item.discont_price
          );
          return (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className={styles.saleCard}
            >
              {discountPercent && (
                <div className={styles.discountBadge}>-{discountPercent}%</div>
              )}
              <div className={styles.imageWrapper}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.saleImage}
                />
                <button
                  className={styles.addToCartBtn}
                  onClick={(e) => handleAddToBasket(e, item)}
                >
                  Add to Cart
                </button>
              </div>
              <h4 className={styles.saleTitle}>{item.title}</h4>
              <div className={styles.priceWrapper}>
                <span className={styles.discountPrice}>
                  ${item.discont_price}
                </span>
                <span className={styles.originalPrice}>${item.price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
