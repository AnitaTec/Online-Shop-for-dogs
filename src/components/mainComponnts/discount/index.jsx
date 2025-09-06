import styles from "./discounts.module.css";
import { Button } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/products/all")
      .then((response) => {
        const randomSales = response.data
          .filter(
            (item) =>
              item.discont_price !== null && item.discont_price !== undefined
          )
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setSales(randomSales);
      })
      .catch((error) => console.error("Ошибка загрузки товаров:", error));
  }, []);

  const getDiscountPercent = (price, discountPrice) => {
    if (!discountPrice) return null;
    return Math.round(((price - discountPrice) / price) * 100);
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
            <Link key={item.id} to="/sales" className={styles.saleCard}>
              {discountPercent && (
                <div className={styles.discountBadge}>-{discountPercent}%</div>
              )}
              <img
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
                className={styles.saleImage}
              />
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
