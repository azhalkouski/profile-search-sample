import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
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
  async (user, { getState }) => {
    const user2 = getState().users.entities[user.id];
    const response = await httpClient.get(`/users/${user.login}/repos`);

    const newUser = {
      ...user2,
      repositories: response.data,
    };

    return newUser;
  }
);

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  ids: [],
  entities: {},
  usersLoading: false,
  reposLoading: false,
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.usersLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.usersLoading = false;

      usersAdapter.removeAll(state);
      usersAdapter.addMany(state, action.payload);
    },
    [fetchUsers.rejected]: (state, action) => {
      state.usersLoading = false;
    },
    [fetchRepositories.pending]: (state, action) => {
      state.reposLoading = true;
    },
    [fetchRepositories.fulfilled]: (state, action) => {
      state.reposLoading = false;
      usersAdapter.upsertOne(state, action.payload);
    },
    [fetchRepositories.rejected]: (state, action) => {
      state.reposLoading = false;
    },
  },
});

export default usersSlice.reducer;

export const { selectIds, selectById } = usersAdapter.getSelectors(
  (state) => state.users
);
