import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  input: string;
}

const initialState: InitialState = {
  input: '',
};

const commentSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    updateComment(state, action) {
      state.input = action.payload;
    },
  },
});

export const { updateComment } = commentSlice.actions;

export default commentSlice;
