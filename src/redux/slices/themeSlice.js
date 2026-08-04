import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';

const initialState = {
  mode: loadState('novara_theme', 'dark'), // 'dark' | 'light'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      saveState('novara_theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      saveState('novara_theme', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
