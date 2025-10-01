import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://excel-analytics-backend-5umy.onrender.com/api/files/";

// Upload file
export const uploadFile = createAsyncThunk(
  "files/upload",
  async ({ file, token }) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(API_URL + "upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

// Get user files
export const getFiles = createAsyncThunk("files/getAll", async (token) => {
  const res = await axios.get(API_URL + "myfiles", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

const fileSlice = createSlice({
  name: "files",
  initialState: { files: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.files.unshift(action.payload.file);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      });
  },
});

export default fileSlice.reducer;
