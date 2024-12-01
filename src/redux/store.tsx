// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

// Definimos el tipo del `RootState` (todo el estado de la app)
export type RootState = ReturnType<typeof store.getState>;
// Definimos el tipo del `AppDispatch` (dispatch de la app)
export type AppDispatch = typeof store.dispatch;

export default store;
