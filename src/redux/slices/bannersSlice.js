import { createSlice } from '@reduxjs/toolkit';
import { banners as seedBanners } from '../../data/misc';
import { loadState, saveState } from '../../utils/storage';

const initialState = {
  list: loadState('novara_banners', seedBanners),
};

const persist = (state) => saveState('novara_banners', state.list);

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    addBanner: (state, action) => {
      const nextId = Math.max(0, ...state.list.map((b) => b.id)) + 1;
      state.list.push({ id: nextId, enabled: true, ...action.payload });
      persist(state);
    },
    updateBanner: (state, action) => {
      const idx = state.list.findIndex((b) => b.id === action.payload.id);
      if (idx > -1) state.list[idx] = { ...state.list[idx], ...action.payload };
      persist(state);
    },
    deleteBanner: (state, action) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
      persist(state);
    },
    toggleBanner: (state, action) => {
      const banner = state.list.find((b) => b.id === action.payload);
      if (banner) banner.enabled = !banner.enabled;
      persist(state);
    },
  },
});

export const { addBanner, updateBanner, deleteBanner, toggleBanner } = bannersSlice.actions;
export default bannersSlice.reducer;
