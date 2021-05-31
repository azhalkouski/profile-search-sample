import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpClient } from '../../app/httpClient';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (username) => {
    const response = await httpClient.get('search/users', {
      params: {
        q: `${username} in:login`,
        type: 'Users',
        per_page: 5,
      },
    });

    return response.data.items;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: false },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;
