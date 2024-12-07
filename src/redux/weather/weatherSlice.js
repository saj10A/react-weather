import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

export const getWeatherInfo = createAsyncThunk(
  "weather/getWeatherinfo",
  async (query) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=7ebcd0b29f8e07a508956a38313b3ce0`
    );
    return res.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getWeatherInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWeatherInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getWeatherInfo.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.error.message;
    });
  },
});

export default weatherSlice.reducer;
