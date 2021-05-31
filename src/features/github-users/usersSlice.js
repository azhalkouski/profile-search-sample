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

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (userLogin) => {
    const response = await httpClient.get(`/users/${userLogin}/repos`);

    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], usersLoading: false, reposLoading: false },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.usersLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.usersLoading = false;
      state.entities = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
    [fetchRepositories.pending]: (state, action) => {
      state.reposLoading = true;
    },
    [fetchRepositories.fulfilled]: (state, action) => {
      state.reposLoading = false;
      const user = state.entities.find((el) => el.login === action.meta.arg);
      user.repositories = action.payload;
    },
    [fetchRepositories.rejected]: (state, action) => {
      state.reposLoading = false;
    },
  },
});

export default usersSlice.reducer;
