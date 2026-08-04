import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';

const seedEvents = [
  { id: 1, text: 'Free shipping on orders over $50', enabled: true },
  { id: 2, text: 'New arrivals every week', enabled: true },
  { id: 3, text: '1-year warranty on every order', enabled: true },
];

const initialState = {
  list: loadState('novara_events', seedEvents),
};

const persist = (state) => saveState('novara_events', state.list);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      const nextId = Math.max(0, ...state.list.map((e) => e.id)) + 1;
      state.list.push({ id: nextId, enabled: true, ...action.payload });
      persist(state);
    },
    updateEvent: (state, action) => {
      const idx = state.list.findIndex((e) => e.id === action.payload.id);
      if (idx > -1) state.list[idx] = { ...state.list[idx], ...action.payload };
      persist(state);
    },
    deleteEvent: (state, action) => {
      state.list = state.list.filter((e) => e.id !== action.payload);
      persist(state);
    },
    toggleEvent: (state, action) => {
      const item = state.list.find((e) => e.id === action.payload);
      if (item) item.enabled = !item.enabled;
      persist(state);
    },
    reorderEvents: (state, action) => {
      state.list = action.payload;
      persist(state);
    },
  },
});

export const { addEvent, updateEvent, deleteEvent, toggleEvent, reorderEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
