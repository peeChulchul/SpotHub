import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  children: null
};

const modalModules = createSlice({
  initialState,
  name: 'modalModules',
  reducers: {
    modalopen: (state, actions) => {
      state.isOpen = true;
      state.children = actions.payload;
    },
    modalclose: (state, actions) => {
      state.isOpen = false;
      state.children = null;
    }
  }
});

export const { modalopen, modalclose } = modalModules.actions;
export default modalModules.reducer;
