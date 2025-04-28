import { configureStore } from "@reduxjs/toolkit";
import { currencyReducer } from "./slice/currencySlice";
import { cartAndWishlistReducer } from "./slice/cartAndWishlistSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cartAndWishlist: cartAndWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable strict mode
    }),
  devTools: false,
});
