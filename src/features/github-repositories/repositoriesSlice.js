import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { httpClient } from '../../app/httpClient';

const repositoriesAdapter = createEntityAdapter({
  selectId: (repo) => repo.id,
});

const initialState = repositoriesAdapter.getInitialState();

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (userLogin) => {
    const response = await httpClient.get(`/users/${userLogin}/repos`);

    return response.data;
  }
);

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchRepositories.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      repositoriesAdapter.upsertMany(state, action.payload);
    },
  },
});

export default repositoriesSlice.reducer;

export const {
  selectAll: selectAllRepositories,
  selectById: selectRepositoryById,
  selectIds: selectRepositoriesIds,
} = repositoriesAdapter.getSelectors((state) => state.repositories);

export const selectRepositoriesByUser = createSelector(
  [selectAllRepositories, (state, userId) => userId],
  (repos, userId) => repos.filter((repo) => repo.owner.id === userId)
);
