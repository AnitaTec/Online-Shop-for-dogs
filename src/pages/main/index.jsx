import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "./main.module.css";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.heroBlock}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>
            Amazing Discounts <br /> on Pets Products!
          </h1>
          <NavLink to="/sales" className={styles.link}>
            <Button
              variant="contained"
              sx={{
                width: "218px",
                backgroundColor: "#0D50FF",
                color: "#FFFFFF",
                padding: "16px 0",
                fontSize: "20px",
                fontWeight: "600",
                lineHeight: "1.3",
                borderRadius: "6px",
                fontFamily: "'Montserrat', sans-serif",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0a40cc",
                },
              }}
            >
              Check out
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
