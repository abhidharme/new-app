import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

export const signInAdmin = createAsyncThunk("SignInSlice", async (body, { rejectWithValue }) => {
  try {
    // console.log("body==>",body)
    const response = await axios.post(`${`https://api.externtalent.com`}/admin/signin/`, body)
    // console.log("response==>",response)

    const token = response?.data?.access_token;
    if (token) {
      localStorage.setItem("token", response?.data?.access_token); // For client-side access
      localStorage.setItem("role", response?.data?.user?.role); // For client-side access
      Cookies.set('token', response?.data?.access_token);          // For middleware/server access
      Cookies.set('role', response?.data?.user?.role);          // For middleware/server access
    }
    toast.success(response?.data?.message)
    // reactLocalStorage.clear();
    return response;

  } catch (err) {
    // console.log('err',err)
    toast.dismiss();
    toast.error(err?.response?.data?.detail);
    return rejectWithValue(err);
  }
}
);

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    adminData: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signInAdmin.pending, (state) => {
        state.loading = true;
      })

      .addCase(signInAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminData = (action.payload);
      }
      )
      .addCase(signInAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authReducer.reducer;