import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";


export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await API.get("/api/cart");
  return res.data.cart;
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }) => {
    const res = await API.post("/api/cart", { productId, quantity });
    return res.data.cart;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }) => {
    const res = await API.put(`/api/cart/${id}`, { quantity });
    return res.data.cart;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    const res = await API.delete(`/api/cart/${id}`);
    return res.data.cart;
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export default cartSlice.reducer;
