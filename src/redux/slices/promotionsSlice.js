import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';

const initialState = {
  list: loadState('novara_promotions', []),
};

const persist = (state) => saveState('novara_promotions', state.list);

const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    addPromotion: (state, action) => {
      const nextId = Math.max(0, ...state.list.map((p) => p.id)) + 1;
      state.list.push({ id: nextId, enabled: true, items: [], ...action.payload });
      persist(state);
    },
    updatePromotion: (state, action) => {
      const idx = state.list.findIndex((p) => p.id === action.payload.id);
      if (idx > -1) state.list[idx] = { ...state.list[idx], ...action.payload };
      persist(state);
    },
    deletePromotion: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
      persist(state);
    },
    togglePromotion: (state, action) => {
      const item = state.list.find((p) => p.id === action.payload);
      if (item) item.enabled = !item.enabled;
      persist(state);
    },
  },
});

export const { addPromotion, updatePromotion, deletePromotion, togglePromotion } = promotionsSlice.actions;
export default promotionsSlice.reducer;
