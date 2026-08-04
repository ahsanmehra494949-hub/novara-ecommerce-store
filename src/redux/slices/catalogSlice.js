import { createSlice } from '@reduxjs/toolkit';
import { products as seedProducts } from '../../data/products';
import { categories as seedCategories } from '../../data/categories';
import { loadState, saveState } from '../../utils/storage';

const sanitizeProducts = (list) => list.map((p) => (
  Array.isArray(p.images) ? p : { ...p, images: [] }
));

const initialState = {
  products: sanitizeProducts(loadState('novara_products', seedProducts)),
  categories: loadState('novara_categories', seedCategories),
};

const persistProducts = (state) => saveState('novara_products', state.products);
const persistCategories = (state) => saveState('novara_categories', state.categories);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const nextId = Math.max(0, ...state.products.map((p) => p.id)) + 1;
      const images = action.payload.images && action.payload.images.length ? action.payload.images : [];
      state.products.unshift({ id: nextId, rating: 0, reviewCount: 0, ...action.payload, images });
      persistProducts(state);
    },
    updateProduct: (state, action) => {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx > -1) {
        const images = action.payload.images && action.payload.images.length ? action.payload.images : state.products[idx].images;
        state.products[idx] = { ...state.products[idx], ...action.payload, images };
      }
      persistProducts(state);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      persistProducts(state);
    },
    addCategory: (state, action) => {
      const nextId = Math.max(0, ...state.categories.map((c) => c.id)) + 1;
      state.categories.push({ id: nextId, ...action.payload });
      persistCategories(state);
    },
    updateCategory: (state, action) => {
      const idx = state.categories.findIndex((c) => c.id === action.payload.id);
      if (idx > -1) state.categories[idx] = { ...state.categories[idx], ...action.payload };
      persistCategories(state);
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
      persistCategories(state);
    },
    reorderCategories: (state, action) => {
      state.categories = action.payload;
      persistCategories(state);
    },
  },
});

export const {
  addProduct, updateProduct, deleteProduct,
  addCategory, updateCategory, deleteCategory, reorderCategories,
} = catalogSlice.actions;
export default catalogSlice.reducer;
