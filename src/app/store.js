import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/github-users/usersSlice';
import repositoriesReducer from '../features/github-repositories/repositoriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    repositories: repositoriesReducer,
  },
});
