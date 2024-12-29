'use client'; // Mark this file as client-side

import store from "@/app/store/store";
import { Provider } from "react-redux";
import { fetchUser } from "@/app/features/user/userSlice";
import { fetchItems } from "@/app/features/items/itemsSlice";

store.dispatch(fetchUser());
store.dispatch(fetchItems());

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
