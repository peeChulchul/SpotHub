import { configureStore } from '@reduxjs/toolkit';
import currentUserModules from './modules/currentUserModules';
import markerModules from './modules/markerModules';
import commentModules from './modules/commentModules';
import modalModules from './modules/modalModules';
export const store = configureStore({
  reducer: { currentUserModules, markerModules, commentModules, modalModules }
});
