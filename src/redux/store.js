import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import themeReducer from './slices/themeSlice';
import catalogReducer from './slices/catalogSlice';
import ordersReducer from './slices/ordersSlice';
import usersReducer from './slices/usersSlice';
import bannersReducer from './slices/bannersSlice';
import eventsReducer from './slices/eventsSlice';
import promotionsReducer from './slices/promotionsSlice';
import brandsReducer from './slices/brandsSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
    catalog: catalogReducer,
    orders: ordersReducer,
    users: usersReducer,
    banners: bannersReducer,
    events: eventsReducer,
    promotions: promotionsReducer,
    brands: brandsReducer,
    reviews: reviewsReducer,
  },
});
