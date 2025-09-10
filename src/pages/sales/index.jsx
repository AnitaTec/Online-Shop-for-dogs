import { NavLink } from "react-router-dom";
import { Button, Select, MenuItem } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/slices/basketSlice";
import styles from "./sales.module.css";

export default function Sales() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    axios
      .get("http://localhost:3333/products/all")
      .then((res) => setProducts(res.data || []))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.discont_price)
      .filter((p) => {
        const price = p.discont_price;
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "newest") return b.id - a.id;
        if (sortOption === "price-high-low")
          return b.discont_price - a.discont_price;
        if (sortOption === "price-low-high")
          return a.discont_price - b.discont_price;
        return 0;
      });
  }, [products, minPrice, maxPrice, sortOption]);

  const handleAddToBasket = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToBasket({ ...product, quantity: 1 }));
  };

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
          Sales
        </Button>
      </div>

      <h2 className={styles.categoriesTitle}>Sales</h2>

      <div className={styles.filtersWrapper}>
        <div className={styles.filterBlock}>
          <label className={styles.filterLabel}>Price</label>
          <input
            type="number"
            placeholder="from"
            className={styles.priceInput}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="to"
            className={styles.priceInput}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className={styles.filterBlock}>
          <label className={styles.filterLabel}>Sorted</label>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            sx={{
              width: "200px",
              height: "36px",
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                fontSize: 16,
                fontFamily: "Montserrat, sans-serif",
                borderColor: "#7575753a",
                paddingLeft: "16px",
              },
            }}
          >
            <MenuItem value="default">by default</MenuItem>
            <MenuItem value="newest">newest</MenuItem>
            <MenuItem value="price-high-low">price: high-low</MenuItem>
            <MenuItem value="price-low-high">price: low-high</MenuItem>
          </Select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const discountPercent = Math.round(
              ((product.price - product.discont_price) / product.price) * 100
            );

            return (
              <NavLink
                key={product.id}
                to={`/products/${product.id}`}
                className={styles.productCard}
              >
                {discountPercent > 0 && (
                  <div className={styles.discountBadge}>
                    -{discountPercent}%
                  </div>
                )}
                <div className={styles.imageWrapper}>
                  <img
                    src={`http://localhost:3333${product.image}`}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <button
                    className={styles.addToCartBtn}
                    onClick={(e) => handleAddToBasket(e, product)}
                  >
                    Add to Cart
                  </button>
                </div>
                <h4 className={styles.productTitle}>{product.title}</h4>
                <div className={styles.priceWrapper}>
                  <span className={styles.discountPrice}>
                    ${product.discont_price}
                  </span>
                  <span className={styles.originalPrice}>${product.price}</span>
                </div>
              </NavLink>
            );
          })
        ) : (
          <div className={styles.spinner}></div>
        )}
      </div>
    </div>
  );
}
