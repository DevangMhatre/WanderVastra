import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import api from "../axios";

// Fetch all orders (Admin only)
export const fetchAllOrders = createAsyncThunk(
  "adminOrder/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/admin/orders");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Update the Order (Admin only)
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/admin/orders/${id}`, { id, status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Delete the Order (Admin only)
export const deleteOrder = createAsyncThunk(
  "adminOrder/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/admin/orders/${id}`);
      return id; // return id directly
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

// Helper to calculate totals
const calculateStats = (orders) => {
  const totalOrders = orders.length;

  const totalSales = orders.reduce((acc, order) => {
    return acc + (order.totalPrice || 0);
  }, 0);

  return { totalOrders, totalSales };
};

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ! Fetch Orders
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;

        const { totalOrders, totalSales } = calculateStats(state.orders);
        state.totalOrders = totalOrders;
        state.totalSales = totalSales;
      })

      // ! Update Order
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;

        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id,
        );

        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }

        const { totalOrders, totalSales } = calculateStats(state.orders);
        state.totalOrders = totalOrders;
        state.totalSales = totalSales;
      })

      // ! Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.filter(
          (order) => order._id !== action.payload,
        );

        const { totalOrders, totalSales } = calculateStats(state.orders);
        state.totalOrders = totalOrders;
        state.totalSales = totalSales;
      })

      .addMatcher(
        isPending(fetchAllOrders, updateOrderStatus, deleteOrder),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isRejected(fetchAllOrders, updateOrderStatus, deleteOrder),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        },
      );
  },
});

export default adminOrderSlice.reducer;
