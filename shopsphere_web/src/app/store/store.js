import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import itemsReducer from '../features/items/itemsSlice';

const store = configureStore ({
    reducer: {
        user: userReducer,
        items: itemsReducer
    }
})

export default store;