import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { throwError } from './error-slice';

interface InitialState {
  id: string;
  isLoading: boolean;
}

const initialState: InitialState = {
  id: '',
  isLoading: true,
};

type MemberType = {
  [key: string]: unknown;
  id: string;
};

export const getMemberInfo = createAsyncThunk(
  '/member/getMemberInfo',
  async (APItoken: string, thunkAPI) => {
    try {
      const response = await axios.get(`/1/tokens/${APItoken}/member`);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get your boards'));
      return thunkAPI.rejectWithValue('');
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
    builder.addCase(
      getMemberInfo.fulfilled,
      (state, action: PayloadAction<MemberType>) => {
        const { id } = action.payload;
        state.id = id;
        state.isLoading = false;
      },
    );
    builder.addCase(getMemberInfo.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default memberSlice;
