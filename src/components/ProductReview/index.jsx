import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../redux/slices/basketSlice";
import styles from "./productReview.module.css";

export default function ProductReview() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const maxVisibleChars = 600;

  useEffect(() => {
    axios
      .get(`http://localhost:3333/products/${id}`)
      .then((res) => {
        if (!res.data.length) return;
        const prod = res.data[0];
        prod.image = `http://localhost:3333${prod.image}`;
        setProduct(prod);

        axios
          .get("http://localhost:3333/categories/all")
          .then((resCat) => {
            const category = resCat.data.find((c) => c.id === prod.categoryId);
            setCategoryName(category ? category.title : "");
          })
          .catch((err) => console.error(err));

        axios
          .get("http://localhost:3333/products/all")
          .then((resRel) => {
            const filtered = resRel.data.filter((p) => p.id !== prod.id);
            setRelatedProducts(filtered.slice(0, 3));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className={styles.spinner}>Loading...</div>;

  const discountPercent = product.discont_price
    ? Math.round(
        ((product.price - product.discont_price) / product.price) * 100
      )
    : null;

  const descriptionText = showFullDescription
    ? product.description
    : product.description.slice(0, maxVisibleChars) +
      (product.description.length > maxVisibleChars ? "..." : "");

  return (
    <div className={styles.productPageWrapper}>
      <div className={styles.buttonContainer}>
        <NavLink to="/">
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

        <NavLink to="/categories">
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
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Categories
          </Button>
        </NavLink>

        <span className={styles.conectionLine}></span>

        <NavLink to={`/categories/${product.categoryId}`}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#7575753a",
              borderRadius: "6px",
              fontSize: "16px",
              color: "#757575",
              width: "auto",
              height: "36px",
              px: 2,
              textTransform: "none",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {categoryName || "Category"}
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
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {product.title}
        </Button>
      </div>

      <div className={styles.productPage}>
        <div className={styles.productPageContent}>
          <div className={styles.sideImages}>
            {relatedProducts.map((p) => (
              <NavLink key={p.id} to={`/products/${p.id}`}>
                <img
                  src={`http://localhost:3333${p.image}`}
                  alt={p.title}
                  className={styles.sideImage}
                />
              </NavLink>
            ))}
          </div>

          <div className={styles.imageWrapper}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
          </div>

          <div className={styles.infoWrapper}>
            <h2 className={styles.title}>{product.title}</h2>

            <div className={styles.priceBlock}>
              {product.discont_price ? (
                <>
                  <span className={styles.discountPrice}>
                    ${product.discont_price}
                  </span>
                  <span className={styles.originalPrice}>${product.price}</span>
                </>
              ) : (
                <span className={styles.discountPrice}>${product.price}</span>
              )}
              {discountPercent && (
                <span className={styles.discountPercent}>
                  {discountPercent}%
                </span>
              )}
            </div>
            <div className={styles.quantityBlock}>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className={styles.quantityNumber}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0D50FF",
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "20px",
                  lineHeight: 1.3,
                  padding: 0,
                  borderRadius: "6px",
                  width: "316px",
                  height: "58px",
                  marginLeft: "32px",
                }}
                onClick={() => {
                  dispatch(addToBasket({ ...product, quantity }));
                  setQuantity(1);
                }}
              >
                Add to Cart
              </Button>
            </div>

            <div className={styles.descriptionWrapper}>
              <h3 className={styles.descriptionTitle}>Description</h3>
              <div className={styles.descriptionBox}>
                <p className={styles.descriptionText}>{descriptionText}</p>
                {product.description.length > maxVisibleChars && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className={styles.readMoreButton}
                  >
                    {showFullDescription ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
