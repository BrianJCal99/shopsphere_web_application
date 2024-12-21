"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "./itemsSlice";

export default function ItemsList() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector((state) => state.items);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems()); // Fetch items when the component loads
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading items...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li> // Adjust property names based on your table schema
        ))}
      </ul>
    </div>
  );
}
