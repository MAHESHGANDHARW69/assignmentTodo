import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import thunk from 'redux-thunk';
import counterReducer from './todolist/todoSlice'; // example slice

const rootReducer = combineReducers({
  counter: counterReducer,
  // add other slices here
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
