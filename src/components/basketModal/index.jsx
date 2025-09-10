import { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./basketModal.module.css";

export default function BasketModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <ClearIcon fontSize="inherit" />
        </button>
        <h2>Congratulations!</h2>
        <p className={styles.modalText}>
          Your order has been successfully placed.
        </p>
        <p>
          A manager will contact you shortly <br /> to confirm your order.
        </p>
      </div>
    </div>
  );
}
