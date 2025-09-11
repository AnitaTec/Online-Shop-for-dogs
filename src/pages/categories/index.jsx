import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./categories.module.css";
import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorieSlice"; // ✅ prover' nazvanie fajla
import { AppContext } from "../../context/AppContext";

export default function Categories() {
  const dispatch = useDispatch();
  const {
    items: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const { BASE_URL } = useContext(AppContext);

  useEffect(() => {
    dispatch(fetchCategories(BASE_URL));
  }, [dispatch, BASE_URL]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.categoriesWrapper}>
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
              color: "black",
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
      </div>

      <h2 className={styles.categoriesTitle}>Categories</h2>

      <div className={styles.categoriesGrid}>
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to={`/categories/${cat.id}`}
            className={styles.categoryCard}
          >
            <img
              src={`${BASE_URL}${cat.image}`}
              alt={cat.title}
              className={styles.categoryImage}
            />
            <h4 className={styles.categoryTitle}>{cat.title}</h4>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
