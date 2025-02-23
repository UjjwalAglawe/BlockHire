// import { configureStore } from "@reduxjs/toolkit";
// import signupReducer from "./signupSlice"

// const store = configureStore({
//     reducer:{
//         signup: signupReducer,
//     },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupSlice";
import storage from "redux-persist/lib/storage"; // Use localStorage as default
import { persistReducer, persistStore } from "redux-persist";

// Configure persistence
const persistConfig = {
    key: 'root',       // Key to store data under
    storage,           // Use localStorage for persistence
};

const persistedSignupReducer = persistReducer(persistConfig, signupReducer);

// Create the store
const store = configureStore({
    reducer: {
        signup: persistedSignupReducer,
    },
});

export const persistor = persistStore(store);
export default store;
