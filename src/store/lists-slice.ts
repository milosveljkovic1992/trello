import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { throwError } from './error-slice';

export type ListType = {
  id: string;
  name: string;
  pos: number;
  idBoard: string;
};

export const archiveList = createAsyncThunk(
  '/lists/archiveList',
  async (listId: string, thunkAPI) => {
    try {
      await axios.put(`/1/lists/${listId}?closed=true`);
      return listId;
    } catch (error) {
      thunkAPI.dispatch(throwError('List could not be removed'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface SubmitList {
  userInput: string;
  pos: number;
  boardId: string;
}

export const submitList = createAsyncThunk(
  '/lists/submitList',
  async ({ userInput, pos, boardId }: SubmitList, thunkAPI) => {
    try {
      const response = await axios.post(
        `/1/lists?name=${userInput}&pos=${pos}&idBoard=${boardId}`,
      );
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('New list could not be added'));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

interface InitialState {
  updatedListId: string;
  updatedOriginListId: string;
  listsArray: ListType[];
}

const initialState: InitialState = {
  updatedListId: '',
  updatedOriginListId: '',
  listsArray: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setListsArray(state, action) {
      state.listsArray = action.payload;
    },
    informListUpdate(state, action) {
      state.updatedListId = action.payload;
    },
    resetListUpdate(state) {
      state.updatedListId = '';
    },
    informOriginListUpdate(state, action) {
      state.updatedOriginListId = action.payload;
    },
    resetOriginListUpdate(state) {
      state.updatedOriginListId = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(archiveList.fulfilled, (state, action) => {
      state.listsArray = state.listsArray.filter(
        (list) => list.id !== action.payload,
      );
    });
    builder.addCase(submitList.fulfilled, (state, action) => {
      state.listsArray.push(action.payload);
    });
  },
});

export const {
  setListsArray,
  informListUpdate,
  resetListUpdate,
  informOriginListUpdate,
  resetOriginListUpdate,
} = listsSlice.actions;

export default listsSlice;
