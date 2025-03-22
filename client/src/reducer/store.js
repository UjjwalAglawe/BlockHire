import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);



// import { configureStore } from "@reduxjs/toolkit";
// import signupReducer from "./signupSlice";
// import storage from "redux-persist/lib/storage"; // Use localStorage
// import { persistReducer, persistStore } from "redux-persist";
// import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// // Configure persistence
// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedSignupReducer = persistReducer(persistConfig, signupReducer);

// // Create the store
// const store = configureStore({
//     reducer: {
//         signup: persistedSignupReducer,
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ Ignore persist actions
//             },
//         }),
// });

// export const persistor = persistStore(store);
// export default store;

