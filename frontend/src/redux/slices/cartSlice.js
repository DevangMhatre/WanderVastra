import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isPending,
} from "@reduxjs/toolkit";
import api from "../axios";

// // Helper function to load cart from storage
// const loadCartFromStorage = () => {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : { products: [] };
// };

// // Helper function to save cart to local storage
// const saveCartToStorage = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// Fetch cart for user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/cart");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Add item to cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/cart", {
        productId,
        quantity,
        size,
        color,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.put("/api/cart", {
        productId,
        quantity,
        size,
        color,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color }, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/cart", {
        data: { productId, size, color },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Merge guest cart with logged-in user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/cart/merge");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: { products: [] },
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      // ! FETCH CART
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      // ! ADD TO CART
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      // ! UPDATE QUANTITY
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      // ! REMOVE ITEM
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })

      // ! MERGE CART
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      .addMatcher(
        isPending(
          fetchCart,
          addToCart,
          updateCartItemQuantity,
          removeFromCart,
          mergeCart,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(
          fetchCart,
          addToCart,
          updateCartItemQuantity,
          removeFromCart,
          mergeCart,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        },
      );
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
