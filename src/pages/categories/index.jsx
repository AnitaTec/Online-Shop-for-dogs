import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./categories.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

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
              src={`http://localhost:3333${cat.image}`}
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
