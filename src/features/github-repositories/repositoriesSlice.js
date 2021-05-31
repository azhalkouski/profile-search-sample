import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpClient } from '../../app/httpClient';

export const fetchRepositories = createAsyncThunk(
  'repositories/fetchRepositories',
  async (userLogin) => {
    const response = await httpClient.get(`/users/${userLogin}/repos`);

    return response.data;
  }
);

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  extraReducers: {
    [fetchRepositories.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.entities = state.entities.concat(action.payload);
    },
  },
});

export default repositoriesSlice.reducer;
