import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/app/features/user/userSlice';
import itemsReducer from '@/app/features/items/itemsSlice';
import cartReducer from '@/app/features/cart/cartSlice';

const store = configureStore ({
    reducer: {
        user: userReducer,
        items: itemsReducer,
        cart: cartReducer,
    }
})

export default store;