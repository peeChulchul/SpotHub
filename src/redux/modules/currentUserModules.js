import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  massage: null,
  error: null,
  currentUser: null
};

const currentUserModules = createSlice({
  name: 'currentUserModules',
  initialState,
  reducers: {
    currentUserPendeing: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    currentUserFullfild: (state, action) => {
      state.isLoading = false;

      state.currentUser = action.payload === null ? null : { ...action.payload };
    },
    currentUserRejected: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { currentUserPendeing, currentUserFullfild, currentUserRejected } = currentUserModules.actions;
export default currentUserModules.reducer;
