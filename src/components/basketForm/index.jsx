import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearBasket } from "../../redux/slices/basketSlice";
import styles from "./basketForm.module.css";

export default function BasketForm({ totalPrice, totalItems }) {
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basket.items || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (basket.length === 0) {
      alert("Basket is empty");
      return;
    }

    try {
      await axios.post("http://localhost:3333/order/send", {
        customer: data,
        products: basket.map(({ id, quantity }) => ({ id, quantity })),
      });
      alert("Order sent successfully!");
      dispatch(clearBasket());
      reset();
    } catch (err) {
      console.error(err);
      alert("Error sending order");
    }
  };

  return (
    <form className={styles.orderForm} onSubmit={handleSubmit(onSubmit)}>
      {" "}
      <p>Order details</p>
      <div className={styles.totalPrice}>
        {totalItems} {totalItems === 1 ? "item" : "items"} — Total Price: $
        {totalPrice}
      </div>
      <label>
        Name
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </label>
      <label>
        Phone
        <input
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^\+?\d{10,15}$/,
              message: "Invalid phone number",
            },
          })}
          type="tel"
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </label>
      <label>
        Email
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          type="email"
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </label>
      <button type="submit" className={styles.orderButton}>
        Order
      </button>
    </form>
  );
}
