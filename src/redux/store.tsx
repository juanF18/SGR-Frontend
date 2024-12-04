/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './sessionSlice';
import {
  persistStore,
  persistReducer,
  Persistor,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

// Implementación de un noop storage para cuando estemos en el servidor
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

const persistedReducer = persistReducer(persistConfig, sessionReducer);

// Creamos el store de Redux
export const store = configureStore({
  reducer: {
    session: persistedReducer,
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
