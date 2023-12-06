import { configureStore } from '@reduxjs/toolkit';
import authModules from './modules/authModules';
import markerModules from './modules/markerModules';
import commentModules from './modules/commentModules';

export const store = configureStore({
  reducer: { authModules, markerModules, commentModules }
});
