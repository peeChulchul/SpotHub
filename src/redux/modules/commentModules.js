import { createSlice } from '@reduxjs/toolkit';

const 댓글데이터형식 = { comment: '', uid: '', locationid: '', avatar: '', nickname: '', timestamp: '' };

const initialState = {
  isLoading: true,
  massage: null,
  error: null,
  comment: []
};

const commentModules = createSlice({ name: 'commentModules', initialState, reducers: {} });

export default commentModules.reducer;
