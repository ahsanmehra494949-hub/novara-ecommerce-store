import { createSlice } from '@reduxjs/toolkit';
import { mockUsers } from '../../data/misc';
import { loadState, saveState } from '../../utils/storage';

const initialState = {
  list: loadState('novara_users', mockUsers),
};

const persist = (state) => saveState('novara_users', state.list);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const idx = state.list.findIndex((u) => u.id === action.payload.id);
      if (idx > -1) state.list[idx] = { ...state.list[idx], ...action.payload };
      persist(state);
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((u) => u.id !== action.payload);
      persist(state);
    },
    toggleBlockUser: (state, action) => {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) user.status = user.status === 'active' ? 'blocked' : 'active';
      persist(state);
    },
  },
});

export const { updateUser, deleteUser, toggleBlockUser } = usersSlice.actions;
export default usersSlice.reducer;
