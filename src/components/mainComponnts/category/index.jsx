import styles from "./category.module.css";
import { Button } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/categories/all")
      .then((response) => {
        const randomCategories = response.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setCategories(randomCategories);
      })
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  return (
    <div className={styles.categoriesWrapper}>
      <div className={styles.categoriesHeader}>
        <h3 className={styles.fourCategories}>Categories</h3>
        <div className={styles.categoriesRow}>
          <div className={styles.line}></div>
          <NavLink to="/categories" className={styles.link}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#7575753a",
                borderRadius: "6px",
                fontSize: "16px",
                color: "#757575",
                width: "142px",
                height: "36px",
                textTransform: "none",
                whiteSpace: "nowrap",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              All Categories
            </Button>
          </NavLink>
        </div>
      </div>

      <div className={styles.categoriesGrid}>
        {categories.map((cat) => (
          <NavLink
            key={cat.id}
            to="/categories"
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
