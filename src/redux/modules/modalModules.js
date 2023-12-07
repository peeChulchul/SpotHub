import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  children: null
};

const modalModules = createSlice({
  initialState,
  name: 'modalModules',
  reducers: {
    modalOpen: (state, actions) => {
      state.isOpen = true;
    },
    modalClose: (state, actions) => {
      state.isOpen = false;
      state.children = null;
    }
  }
});

export const { modalOpen, modalClose } = modalModules.actions;
export default modalModules.reducer;
