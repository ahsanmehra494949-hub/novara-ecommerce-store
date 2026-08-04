import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../utils/storage';

const initialUser = loadState('novara_user', null);

const initialState = {
  user: initialUser,
  isAuthenticated: !!initialUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveState('novara_user', action.payload);
    },
    register: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      saveState('novara_user', action.payload);
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      saveState('novara_user', state.user);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      saveState('novara_user', null);
    },
  },
});

export const { login, register, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
