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
      console.log(actions.payload);
      state.isOpen = true;
      state.children = JSON.stringify(actions.payload);
    },
    modalClose: (state, actions) => {
      state.isOpen = false;
      state.children = null;
    }
  }
});

export const { modalOpen, modalClose } = modalModules.actions;
export default modalModules.reducer;
