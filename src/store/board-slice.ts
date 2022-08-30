import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';

import { RootState } from 'store';
import { setBoards } from './boards-slice';
import { setListsArray } from './lists-slice';
import { setCards } from './cards-slice';
import { throwError } from './error-slice';

type ScaledImages = {
  url?: string;
};

export type BoardType = {
  [key: string]: unknown;
  id: string;
  name: string;
  prefs: {
    backgroundImage: string;
    backgroundImageScaled: ScaledImages[];
  };
};

export const fetchBoardListsAndCards = createAsyncThunk(
  '/board/fetchBoardListsAndCards',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `/1/batch?urls=/1/boards/${boardId},/1/boards/${boardId}/lists,/1/boards/${boardId}/cards`,
      );
      const fetchedBoard = response.data[0][200];
      const fetchedLists = response.data[1][200];
      const fetchedCards = response.data[2][200];

      if (!fetchedBoard || !fetchedLists || !fetchedCards) {
        throw new Error();
      }
      thunkAPI.dispatch(setListsArray(fetchedLists));
      thunkAPI.dispatch(setCards(fetchedCards));
      return fetchedBoard;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not get board info'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

interface SubmitBoardName {
  board: BoardType;
  boardName: string;
}

export const submitBoardName = createAsyncThunk(
  '/board/submitBoardName',
  async ({ board, boardName }: SubmitBoardName, thunkAPI) => {
    try {
      const response = await axios.put(
        `/1/boards/${board.id}?name=${boardName}`,
      );
      const state = thunkAPI.getState() as RootState;
      thunkAPI.dispatch(setBoards(state.member.id));
      thunkAPI.dispatch(renameBoard(boardName));
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(throwError('Could not edit board name'));
      return thunkAPI.rejectWithValue('');
    }
  },
);

interface InitialState {
  details: BoardType;
  isLoading: boolean;
  hasFailed: boolean;
  isEditPanelOpen: boolean;
  editPanelId: string;
  isCreatingNewList: boolean;
}

const initialState: InitialState = {
  details: {
    id: '',
    name: '',
    prefs: {
      backgroundImage: '',
      backgroundImageScaled: [{}],
    },
  },
  isLoading: true,
  hasFailed: false,
  isEditPanelOpen: false,
  editPanelId: '',
  isCreatingNewList: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetBoard(state) {
      state.details = initialState.details;
      state.isLoading = true;
      state.hasFailed = initialState.hasFailed;
    },
    openEditPanel(state, action: PayloadAction<string>) {
      state.isEditPanelOpen = true;
      state.editPanelId = action.payload;
    },
    closeEditPanel(state) {
      state.isEditPanelOpen = false;
      state.editPanelId = '';
    },
    resetCreatingNewList(state) {
      state.isCreatingNewList = false;
    },
    renameBoard(state, action: PayloadAction<string>) {
      state.details.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardListsAndCards.pending, (state) => {
      state.isLoading = true;
      state.hasFailed = false;
    });
    builder.addCase(
      fetchBoardListsAndCards.fulfilled,
      (state, action: PayloadAction<BoardType>) => {
        state.details = action.payload;
        state.isLoading = false;
        state.hasFailed = false;
      },
    );
    builder.addCase(fetchBoardListsAndCards.rejected, (state) => {
      state.isLoading = false;
      state.hasFailed = true;
    });
    builder.addCase(
      submitBoardName.fulfilled,
      (state, action: PayloadAction<BoardType>) => {
        state.details = action.payload;
      },
    );
  },
});

export const {
  resetBoard,
  openEditPanel,
  closeEditPanel,
  resetCreatingNewList,
  renameBoard,
} = boardSlice.actions;

export default boardSlice;
