import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import api from "../axios";

const initialState = {
  products: [],
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,

  selectedProduct: null,
  similarProducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    size: "",
    color: "",
    gender: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    material: "",
    collection: "",
    limit: "",
    page: 1,
  },
};

export const fetchProductsByFilter = createAsyncThunk(
  "products/fetchByFilters",
  async (filters, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        // 🟢 Handle arrays (size, material, brand)
        if (Array.isArray(value) && value.length > 0) {
          query.set(key, value.join(","));
        }
        // 🟢 Ignore "All"
        else if (value && value !== "All") {
          query.set(key, value);
        }
        // 🟢 Handle numbers like 0 (important for price)
        else if (typeof value === "number") {
          query.set(key, value);
        }
      });

      const response = await api.get(`/api/products?${query.toString()}`);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching products");
    }
  },
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching product");
    }
  },
);

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/similar/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching similar products",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
        limit: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // ! Fetch Products
      .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
        state.loading = false;
        // state.products = Array.isArray(action.payload) ? action.payload : [];
        state.products = action.payload.data || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
        state.totalProducts = action.payload.totalProducts || 0;
      })

      // ! Fetch Product Details
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })

      // ! Similar Products
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })

      .addMatcher(
        isPending(
          fetchProductsByFilter,
          fetchProductDetails,
          fetchSimilarProducts,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(
          fetchProductsByFilter,
          fetchProductDetails,
          fetchSimilarProducts,
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        },
      );
  },
});

export const { setFilters, clearFilters } = productSlice.actions;

export default productSlice.reducer;
