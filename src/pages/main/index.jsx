import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./main.module.css";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.overlay}>
        <h1 className={styles.title}>Amazing Discounts on Pets Products!</h1>
        <NavLink to="/sales" className={styles.link}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={styles.button}
          >
            Check out
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
