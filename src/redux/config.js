import { configureStore } from '@reduxjs/toolkit';
import authModules from './modules/authmodules';
import markerModules from './modules/markerModules';
import commentModules from './modules/commentModules';
import modalModules from './modules/modalModules';
export const store = configureStore({
  reducer: { authModules, markerModules, commentModules, modalModules }
});
