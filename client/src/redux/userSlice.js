import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: '',
  email: '',
  address: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = '';
      state.email = '';
      state.address = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;