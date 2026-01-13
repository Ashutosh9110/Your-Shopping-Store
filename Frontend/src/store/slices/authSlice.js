import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/api"

const token = localStorage.getItem("token")
const user = JSON.parse(localStorage.getItem("user") || "null")

export const login = createAsyncThunk(
  "auth/login",
  async ({ emailOrPhone, password }) => {
    const res = await API.post("/api/auth/login", { emailOrPhone, password })
    return res.data
  }
)

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ emailOrPhone, otp }) => {
    const res = await API.post("/api/auth/verify-otp", { emailOrPhone, otp })
    return res.data
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token,
    loading: false,
    error: null
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.clear()
      delete API.defaults.headers.common["Authorization"]
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => { state.loading = true })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload.token) {
          const { token, role } = action.payload
          const user = { role }

          state.user = user
          state.token = token

          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(user))

          API.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
