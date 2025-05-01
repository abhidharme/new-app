import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ApiClient } from '../api';


export const postJobs = createAsyncThunk("postJobs", async (body, { rejectWithValue }) => {
  try {
    // console.log("body==>", body)
    const response = await ApiClient(`admin/requirements`, 'post', body);
    // const response = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/requirements`, body)

    // axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/requirements`, body)
    toast.success(response?.data?.message)
    // reactLocalStorage.clear();
    return response;

  } catch (err) {
    // console.log('err', err)
    toast.dismiss();
    toast.error(err?.response?.data?.detail);
    return rejectWithValue(err);
  }
}
);

export const getPostedJobs = createAsyncThunk("getPostedJobs", async (body, { rejectWithValue }) => {
  try {
    const response = await ApiClient(`admin/requirements`, 'get', body);
    // toast.success(response?.data?.message);
    return response;

  } catch (err) {
    toast.dismiss();
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
});

export const jobSlice = createSlice({
  name: "jobSlice",
  initialState: {
    createJobData: [],
    postedJobsData:[],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
    // POST JOBS
      .addCase(postJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(postJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.createJobData = action.payload;
      })
      .addCase(postJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET JOBS
      .addCase(getPostedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.postedJobsData = action.payload?.data;
      })
      .addCase(getPostedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default jobSlice.reducer;