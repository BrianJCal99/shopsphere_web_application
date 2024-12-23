// components/ClientProvider.jsx
'use client'; // Mark this file as client-side

import { Provider } from "react-redux";
import store from "@/app/store/store";

import { fetchUser } from "@/app/features/user/userSlice";
import { fetchItems } from "@/app/features/items/itemsSlice";

store.dispatch(fetchItems());
store.dispatch(fetchUser());

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
