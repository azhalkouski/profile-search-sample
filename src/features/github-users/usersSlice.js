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
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.entities = state.entities.concat(action.payload);
    },
  },
});

export default usersSlice.reducer;
