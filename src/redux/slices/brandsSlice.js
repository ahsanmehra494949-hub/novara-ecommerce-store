import { createSlice } from '@reduxjs/toolkit';
import { brandsList as seedBrands } from '../../data/misc';
import { loadState, saveState } from '../../utils/storage';

const initialState = {
  list: loadState('novara_brands', seedBrands),
};

const persist = (state) => saveState('novara_brands', state.list);

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    addBrand: (state, action) => {
      const nextId = Math.max(0, ...state.list.map((b) => b.id)) + 1;
      state.list.push({ id: nextId, enabled: true, logo: '', ...action.payload });
      persist(state);
    },
    updateBrand: (state, action) => {
      const idx = state.list.findIndex((b) => b.id === action.payload.id);
      if (idx > -1) state.list[idx] = { ...state.list[idx], ...action.payload };
      persist(state);
    },
    deleteBrand: (state, action) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
      persist(state);
    },
    toggleBrand: (state, action) => {
      const brand = state.list.find((b) => b.id === action.payload);
      if (brand) brand.enabled = !brand.enabled;
      persist(state);
    },
    reorderBrands: (state, action) => {
      state.list = action.payload;
      persist(state);
    },
  },
});

export const { addBrand, updateBrand, deleteBrand, toggleBrand, reorderBrands } = brandsSlice.actions;
export default brandsSlice.reducer;
