import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearBasket } from "../../redux/slices/basketSlice";
import styles from "./basketForm.module.css";

export default function BasketForm({ totalPrice, totalItems, onOrderSuccess }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (basket.length === 0) return;

    try {
      await axios.post("http://localhost:3333/order/send", {
        customer: data,
        products: basket.map(({ id, quantity }) => ({ id, quantity })),
      });

      dispatch(clearBasket());
      reset();

      if (onOrderSuccess) onOrderSuccess();
    } catch (err) {
      console.error(err);
      alert("Error sending order");
    }
  };

  return (
    <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
      <p>Order details</p>
      <div className={styles.orderSummary}>
        <div className={styles.totalItems}>
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </div>
        <div className={styles.totalPrice}>
          <span className={styles.totalLabel}>Total</span>{" "}
          <span className={styles.totalAmount}>${totalPrice}</span>
        </div>
      </div>

      <input
        {...register("name", { required: "Name is required" })}
        type="text"
        placeholder="Name"
        className={errors.name ? styles.inputError : ""}
      />
      {errors.name && (
        <span className={styles.error}>{errors.name.message}</span>
      )}

      <input
        {...register("phone", {
          required: "Phone is required",
          pattern: {
            value: /^\+?\d{10,15}$/,
            message: "Invalid phone number",
          },
          minLength: {
            value: 10,
            message: "Phone number must be at least 10 characters",
          },
        })}
        type="tel"
        placeholder="Phone number"
        className={errors.phone ? styles.inputError : ""}
      />
      {errors.phone && (
        <span className={styles.error}>{errors.phone.message}</span>
      )}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email",
          },
        })}
        type="email"
        placeholder="Email"
        className={errors.email ? styles.inputError : ""}
      />
      {errors.email && (
        <span className={styles.error}>{errors.email.message}</span>
      )}

      <button type="submit" className={styles.orderButton}>
        Order
      </button>
    </form>
  );
}
