import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ApiClient } from '../api';


export const getAllProfiles = createAsyncThunk("getAllProfiles", async (body, { rejectWithValue }) => {
  try {
    const response = await ApiClient(`admin/get_all_profiles`, 'get', body);
    // toast.success(response?.data?.message);
    return response;

  } catch (err) {
    toast.dismiss();
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
});

export const getProfileByUserId = createAsyncThunk(
  "getProfileByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await ApiClient(`user/get_profile/${userId}`, "get");
      return response.data; // directly profile data
    } catch (err) {
      toast.dismiss();
      toast.error(err?.response?.data?.message || "Failed to fetch profile.");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const getMatchedProfiles = createAsyncThunk("getMatchedProfiles", async (body, { rejectWithValue }) => {
  try {
    const response = await ApiClient(`admin/requirements/${body}/matched_candidates`, 'get', body);
    // toast.success(response?.data?.message);
    return response;

  } catch (err) {
    toast.dismiss();
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err);
  }
});

export const uploadProfileResume = createAsyncThunk("uploadProfileResume", async ({ file, user_id }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);

    const response = await ApiClient(`user/upload_profile/`, "post", formData);

    toast.success("Resume uploaded successfully!");
    return response.data;
  } catch (err) {
    toast.dismiss();
    toast.error(err?.response?.data?.message || "Upload failed.");
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateProfile = createAsyncThunk("updateProfile", async (body, { rejectWithValue }) => {
  try {
    const response = await ApiClient(`user/update_profile/${body?.user_id}`, "put", body?.values);

    toast.success(response?.data?.message);
    return response.data;
  } catch (err) {
    toast.dismiss();
    toast.error(err?.response?.data?.message);
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    matchedProfilesData: [],
    allProfilesData: [],
    updatedProfileData: [],
    uploadedResumeData: null,
    loading: false,
    error: null,
  },
  reducers: {
    // You can add synchronous reducers here if needed
    clearMatchedProfiles: (state) => {
      state.matchedProfilesData = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // GET ALL PROFILES
      .addCase(getAllProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.allProfilesData = action.payload?.data;
      })
      .addCase(getAllProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MATCHED PROFILES
      .addCase(getMatchedProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMatchedProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.matchedProfilesData = action.payload?.data;
      })
      .addCase(getMatchedProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPLOAD LINKEDIN RESUME
      .addCase(uploadProfileResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfileResume.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedResumeData = action.payload;
      })
      .addCase(uploadProfileResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PROFILE BY USER ID
      .addCase(getProfileByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedResumeData = action.payload; // set profile data here
      })
      .addCase(getProfileByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE BY ID
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedProfileData = action.payload; // set profile data here
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearMatchedProfiles } = userSlice.actions;

export default userSlice.reducer;