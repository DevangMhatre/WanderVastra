import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import api from "../axios";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
};

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/login`, userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data.data));

      // console.log(response);
      // console.log(response.data);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// Async Thunk for User Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post(`/api/users/logout`, {});
});

// Async Thunk for User Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/users/register`, userData);

      localStorage.setItem("userInfo", JSON.stringify(response.data.data));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// Async Thunk to verify auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/me");
      return response.data.data;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return rejectWithValue("Not authenticated.");
    }
  },
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      // ! Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("userInfo");
      })

      // ! Login User
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // ! Register User
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      // ! Check User
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
        // state.error = action.payload || action.error.message;
        state.error = null; // ! not above code because expired sessions is not an error
        localStorage.removeItem("userInfo");
      })

      .addMatcher(isPending(loginUser, logoutUser, registerUser), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        isRejected(loginUser, logoutUser, registerUser),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        },
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
