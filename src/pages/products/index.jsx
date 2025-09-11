import { NavLink } from "react-router-dom";
import { Button, Checkbox, Select, MenuItem } from "@mui/material";
import { useEffect, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../../redux/slices/basketSlice";
import { fetchProducts, setMinPrice, setMaxPrice, setDiscountOnly, setSortOption } from "../../redux/slices/productSlice";
import styles from "./products.module.css";
import { AppContext } from "../../context/AppContext";

export default function Products() {
  const dispatch = useDispatch();
  const { BASE_URL } = useContext(AppContext);

  const { items, loading, error, minPrice, maxPrice, discountOnly, sortOption } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(BASE_URL));
  }, [dispatch, BASE_URL]);

  const filteredProducts = useMemo(() => {
    return items
      .filter((p) => {
        const price = p.discont_price || p.price;
        if (minPrice && price < Number(minPrice)) return false;
        if (maxPrice && price > Number(maxPrice)) return false;
        if (discountOnly && !p.discont_price) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "newest") return b.id - a.id;
        if (sortOption === "price-high-low") return (b.discont_price || b.price) - (a.discont_price || a.price);
        if (sortOption === "price-low-high") return (a.discont_price || a.price) - (b.discont_price || b.price);
        return 0;
      });
  }, [items, minPrice, maxPrice, discountOnly, sortOption]);

  const handleAddToBasket = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToBasket({ ...product, quantity: 1 }));
  };

  return (
    <div className={styles.allCategoryWrapper}>
      <div className={styles.buttonContainer}>
        <NavLink to="/" className={styles.link}>
          <Button variant="outlined" sx={{ borderColor: "#7575753a", borderRadius: "6px", fontSize: "16px", color: "#757575", width: "118px", height: "36px", textTransform: "none", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
            Main Page
          </Button>
        </NavLink>
        <span className={styles.conectionLine}></span>
        <Button variant="outlined" disabled sx={{ borderColor: "#7575753a", borderRadius: "6px", fontSize: "16px", color: "black !important", width: "auto", height: "36px", px: 2, textTransform: "none", whiteSpace: "nowrap", fontFamily: "Montserrat, sans-serif" }}>
          All Products
        </Button>
      </div>

      <h2 className={styles.categoriesTitle}>All Products</h2>

      <div className={styles.filtersWrapper}>
        <div className={styles.filterBlock}>
          <label className={styles.filterLabel}>Price</label>
          <input type="number" placeholder="from" className={styles.priceInput} value={minPrice} onChange={(e) => dispatch(setMinPrice(e.target.value))} />
          <input type="number" placeholder="to" className={styles.priceInput} value={maxPrice} onChange={(e) => dispatch(setMaxPrice(e.target.value))} />
        </div>

        <div className={styles.filterBlock}>
          <span className={styles.filterLabel}>Discounted items</span>
          <Checkbox checked={discountOnly} onChange={(e) => dispatch(setDiscountOnly(e.target.checked))} sx={{ color: "#0D50FF", "&.Mui-checked": { color: "#0D50FF" }, padding: 0, marginLeft: "8px", "& .MuiSvgIcon-root": { fontSize: "32px" } }} />
        </div>

        <div className={styles.filterBlock}>
          <label className={styles.filterLabel}>Sorted</label>
          <Select value={sortOption} onChange={(e) => dispatch(setSortOption(e.target.value))} sx={{ width: "200px", height: "36px", "& .MuiSelect-select": { display: "flex", alignItems: "center", boxSizing: "border-box", fontSize: 16, fontFamily: "Montserrat, sans-serif", borderColor: "#7575753a", paddingLeft: "16px" } }}>
            <MenuItem value="default">by default</MenuItem>
            <MenuItem value="newest">newest</MenuItem>
            <MenuItem value="price-high-low">price: high-low</MenuItem>
            <MenuItem value="price-low-high">price: low-high</MenuItem>
          </Select>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {loading ? <div className={styles.spinner}></div> : filteredProducts.map((product) => {
          const discountPercent = product.discont_price ? Math.round(((product.price - product.discont_price) / product.price) * 100) : null;
          return (
            <NavLink key={product.id} to={`/products/${product.id}`} className={styles.productCard}>
              {discountPercent && <div className={styles.discountBadge}>-{discountPercent}%</div>}
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.title} className={styles.productImage} />
                <button className={styles.addToCartBtn} onClick={(e) => handleAddToBasket(e, product)}>Add to Cart</button>
              </div>
              <h4 className={styles.productTitle}>{product.title}</h4>
              <div className={styles.priceWrapper}>
                {product.discont_price ? (
                  <>
                    <span className={styles.discountPrice}>${product.discont_price}</span>
                    <span className={styles.originalPrice}>${product.price}</span>
                  </>
                ) : <span className={styles.discountPrice}>${product.price}</span>}
              </div>
            </NavLink>
          );
        })}
      </div>
      {error && <div>{error}</div>}
    </div>
  );
}
