import configureStore from '@reduxjs/toolkit';
import authModules from './modules/authModules';

export const store = configureStore({
  reducer: { authModules }
});
