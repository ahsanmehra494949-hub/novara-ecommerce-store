import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';


const initialState = {
  list: loadState('novara_reviews', []),
};

const persist = (state) => saveState('novara_reviews', state.list);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action) => {
      const nextId = Math.max(0, ...state.list.map((r) => r.id)) + 1;
      state.list.unshift({
        id: nextId,
        read: false,
        date: new Date().toISOString(),
        image: '',
        ...action.payload,
      });
      persist(state);
    },
    deleteReview: (state, action) => {
      state.list = state.list.filter((r) => r.id !== action.payload);
      persist(state);
    },
    markReviewRead: (state, action) => {
      const r = state.list.find((r) => r.id === action.payload);
      if (r) r.read = true;
      persist(state);
    },
    markAllReviewsRead: (state) => {
      state.list.forEach((r) => { r.read = true; });
      persist(state);
    },
  },
});

export const { addReview, deleteReview, markReviewRead, markAllReviewsRead } = reviewsSlice.actions;
export default reviewsSlice.reducer;
