import { createSlice } from '@reduxjs/toolkit';
import { mockOrders } from '../../data/misc';
import { loadState, saveState } from '../../utils/storage';

const initialState = {
  list: loadState('novara_orders', mockOrders),
};

const persist = (state) => saveState('novara_orders', state.list);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.list.unshift(action.payload);
      persist(state);
    },
    updateOrderStatus: (state, action) => {
      const order = state.list.find((o) => o.id === action.payload.id);
      if (order) order.status = action.payload.status;
      persist(state);
    },
  },
});

export const { placeOrder, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
