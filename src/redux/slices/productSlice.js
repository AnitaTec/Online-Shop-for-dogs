import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (BASE_URL, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/products/all`);
      return res.data.map((p) => ({
        ...p,
        image: p.image.startsWith("http") ? p.image : `${BASE_URL}${p.image}`,
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  minPrice: "",
  maxPrice: "",
  discountOnly: false,
  sortOption: "default",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setDiscountOnly: (state, action) => {
      state.discountOnly = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMinPrice, setMaxPrice, setDiscountOnly, setSortOption } =
  productSlice.actions;
export default productSlice.reducer;
