import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducers from "./state.reducer";
import createSagaMiddleware from "@redux-saga/core";

const persistConfig = {
  key: 'root',
  storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducers);
const sagaMiddleware = createSagaMiddleware();


export const globalStore = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware)
})

export type RootState = ReturnType<typeof globalStore.getState>
export type AppDispatch = typeof globalStore.dispatch
export const globalPersistor = persistStore(globalStore)
