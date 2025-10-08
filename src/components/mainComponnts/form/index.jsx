import React, { useState, useContext } from "react";
import styles from "./form.module.css";
import dogsImage from "../../../assets/images/dogs.png";
import axios from "axios";
import { AppContext } from "../../../context/AppContext";

export default function DiscountForm() {
  const { BASE_URL } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number (minimum 10 digits)";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(`${BASE_URL}/sale/send`, formData);
      setSuccess("Your 5% discount coupon has been sent!");
      setFormData({ name: "", phone: "", email: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setSuccess("Failed to send. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.sale}>5% Off on the First Order</h2>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={dogsImage} alt="Dogs" className={styles.image} />
        </div>
        <form className={styles.right} onSubmit={handleSubmit}>
          <input
            className={styles.inputField}
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}

          <input
            className={styles.inputField}
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          {errors.phone && <div className={styles.error}>{errors.phone}</div>}

          <input
            className={styles.inputField}
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}

          <button className={styles.buttonField} type="submit">
            Get a discount
          </button>

          {success && <div className={styles.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
}
