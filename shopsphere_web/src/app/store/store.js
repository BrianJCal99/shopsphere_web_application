import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/app/features/user/userSlice';
import itemsReducer from '@/app/features/items/itemsSlice';

const store = configureStore ({
    reducer: {
        user: userReducer,
        items: itemsReducer
    }
})

export default store;