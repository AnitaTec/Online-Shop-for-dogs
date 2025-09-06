import React, { useState } from "react";
import styles from "./form.module.css";
import { TextField, Button, Box } from "@mui/material";
import dogsImage from "../../../assets/images/dogs.png";
import axios from "axios";

export default function DiscountForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
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
      await axios.post("http://localhost:3333/sale/send", formData);
      setSuccess("Your 5% discount coupon has been sent!");
      setFormData({ name: "", phone: "", email: "" });
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
        <Box
          className={styles.right}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              width: "518px",
              mb: "16px",
              "& .MuiOutlinedInput-root": {
                height: "58px",
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.3,
                fontFamily: "'Montserrat', sans-serif",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#fff",
              },
              "& .MuiInputBase-input": {
                color: "#fff",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.3,
                height: "58px",
                padding: 0,
                fontFamily: "'Montserrat', sans-serif",
              },
            }}
          />

          <TextField
            label="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{
              width: "518px",
              mb: "16px",
              "& .MuiOutlinedInput-root": {
                height: "58px",
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.3,
                fontFamily: "'Montserrat', sans-serif",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#fff",
              },
              "& .MuiInputBase-input": {
                color: "#fff",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.3,
                height: "58px",
                padding: 0,
                fontFamily: "'Montserrat', sans-serif",
              },
            }}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              width: "518px",
              mb: "32px",
              "& .MuiOutlinedInput-root": {
                height: "58px",
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.3,
                fontFamily: "'Montserrat', sans-serif",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#fff",
              },
              "& .MuiInputBase-input": {
                color: "#fff",
                fontSize: "20px",
                fontWeight: 500,
                lineHeight: 1.3,
                height: "58px",
                padding: 0,
                fontFamily: "'Montserrat', sans-serif",
              },
            }}
          />

          <Button
            type="submit"
            sx={{
              width: "518px",
              height: "58px",
              backgroundColor: "#fff",
              color: "#000",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.3,
              mb: "32px",
              fontFamily: "'Montserrat', sans-serif",
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            Get a discount
          </Button>

          {success && <Box mt={2}>{success}</Box>}
        </Box>
      </div>
    </div>
  );
}
