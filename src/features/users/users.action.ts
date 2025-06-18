import { createAsyncThunk } from "@reduxjs/toolkit";

import { AxiosError } from "axios";


export const createUserAction = createAsyncThunk(
  "user/login",
  async (_, thunkAPI) => {
    try {
     
    } catch (err) {
      const error = err as AxiosError;
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserAction = createAsyncThunk(
    "user/login",
    async (_, thunkAPI) => {
      try {
       

      } catch (err) {
        const error = err as AxiosError;
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );


  export const findOrCreateUserAction = createAsyncThunk(
    "user/login",
    async (_, thunkAPI) => {
      try {
       

      } catch (err) {
        const error = err as AxiosError;
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );


  