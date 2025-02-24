import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

// Configure persistence
const persistConfig = {
    key: 'root',
    storage,
};

const persistedSignupReducer = persistReducer(persistConfig, signupReducer);

// Create the store
const store = configureStore({
    reducer: {
        signup: persistedSignupReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // ✅ Ignore persist actions
            },
        }),
});

export const persistor = persistStore(store);
export default store;
