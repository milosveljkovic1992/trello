import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

const initialState = {
  id: '',
  avatarUrl: '',
  fullName: '',
  url: '',
  username: '',
  email: '',
  idBoards: '',
  isLoading: true,
};

export const getMemberInfo = createAsyncThunk(
  'member/getMemberInfo',
  async (APItoken, thunkAPI) => {
    try {
      const response = await axios.get(`/1/tokens/${APItoken}/member`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get your boards'));
    }
  },
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  extraReducers: {
    [getMemberInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getMemberInfo.fulfilled]: (state, action) => {
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
    },
    [getMemberInfo.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default memberSlice;
