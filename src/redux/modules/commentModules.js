import createSlice from '@reduxjs/toolkit';

const 댓글데이터형식 = { comment: '', uid: '', locationid: '', avatar: '', nickname: '', timestamp: '' };

const initialState = {
  isLoading: true,
  massage: null,
  error: null,
  comment: []
};

const authModules = createSlice({ name: 'authModules', initialState, reducers: {} });
