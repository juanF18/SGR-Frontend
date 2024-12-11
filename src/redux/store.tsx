/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import projectReducer from './projectSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

const noopStorage = {
  setItem: (_key: string, _value: string) => Promise.resolve(),
  getItem: (_key: string) => Promise.resolve(null),
  removeItem: (_key: string) => Promise.resolve(),
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : noopStorage;

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedSessionReducer = persistReducer(persistConfig, sessionReducer);
const persistedProjectReducer = persistReducer(persistConfig, projectReducer);

// Creamos el store de Redux
export const store = configureStore({
  reducer: {
    session: persistedSessionReducer,
    project: persistedProjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor }; // Exportamos el persistor

// Definir los tipos de Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
