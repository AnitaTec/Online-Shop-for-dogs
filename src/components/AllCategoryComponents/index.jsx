import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./allCategory.module.css";

export default function AllCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:3333/categories/${id}`)
      .then((res) => {
        setProducts(res.data.data || []);
        setCategoryName(res.data.category.title || "");
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className={styles.allCategoryWrapper}>
      <div className={styles.buttonContainer}>
        <NavLink to="/" className={styles.link}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#7575753a",
              borderRadius: "6px",
              fontSize: "16px",
              color: "#757575",
              width: "118px",
              height: "36px",
              textTransform: "none",
              whiteSpace: "nowrap",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Main Page
          </Button>
        </NavLink>

        <span className={styles.conectionLine}></span>

        <NavLink to="/categories" className={styles.link}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#7575753a",
              borderRadius: "6px",
              fontSize: "16px",
              color: "#757575",
              width: "118px",
              height: "36px",
              textTransform: "none",
              whiteSpace: "nowrap",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Categories
          </Button>
        </NavLink>

        <span className={styles.conectionLine}></span>

        <Button
          variant="outlined"
          disabled
          sx={{
            borderColor: "#7575753a",
            borderRadius: "6px",
            fontSize: "16px",
            color: "black !important",
            width: "auto",
            height: "36px",
            px: 2,
            textTransform: "none",
            whiteSpace: "nowrap",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {categoryName || "Category"}
        </Button>
      </div>

      <h2 className={styles.categoriesTitle}>{categoryName}</h2>

      <div className={styles.productsGrid}>
        {products.length > 0 ? (
          products.map((product) => {
            const discountPercent = product.discont_price
              ? Math.round(
                  ((product.price - product.discont_price) / product.price) *
                    100
                )
              : null;

            return (
              <NavLink
                key={product.id}
                to={`/products/${product.id}`}
                className={styles.productCard}
              >
                {discountPercent && (
                  <div className={styles.discountBadge}>
                    -{discountPercent}%
                  </div>
                )}
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                  className={styles.productImage}
                />
                <h4 className={styles.productTitle}>{product.title}</h4>
                <div className={styles.priceWrapper}>
                  {product.discont_price ? (
                    <>
                      <span className={styles.discountPrice}>
                        ${product.discont_price}
                      </span>
                      <span className={styles.originalPrice}>
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className={styles.discountPrice}>
                      ${product.price}
                    </span>
                  )}
                </div>
              </NavLink>
            );
          })
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
