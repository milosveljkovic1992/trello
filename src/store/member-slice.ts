import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

interface InitialState {
  id: string;
  avatarUrl: string;
  fullName: string;
  url: string;
  username: string;
  email: string;
  idBoards: string;
  isLoading: boolean;
}

const initialState: InitialState = {
  id: '',
  avatarUrl: '',
  fullName: '',
  url: '',
  username: '',
  email: '',
  idBoards: '',
  isLoading: true,
};

type Error = {
  response: {
    status: number;
  };
};

export const getMemberInfo = createAsyncThunk(
  '/member/getMemberInfo',
  async (APItoken: string, thunkAPI) => {
    try {
      const response = await axios.get(`/1/tokens/${APItoken}/member`);
      return response.data;
    } catch (error) {
      const err = error as Error;
      if (err.response.status && err.response.status === 401) {
        thunkAPI.dispatch(
          throwError('Session expired. Please login to continue'),
        );
      } else {
        thunkAPI.dispatch(throwError('Could not get your boards'));
      }
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMemberInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMemberInfo.fulfilled, (state, action) => {
      const { id, avatarUrl, fullName, url, username, email, idBoards } =
        action.payload;

      state.isLoading = false;
      state.id = id;
      state.avatarUrl = avatarUrl;
      state.fullName = fullName;
      state.url = url;
      state.username = username;
      state.email = email;
      state.idBoards = idBoards;
    });
    builder.addCase(getMemberInfo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default memberSlice;
