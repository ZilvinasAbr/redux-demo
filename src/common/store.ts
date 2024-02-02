import { Reducer, UnknownAction, configureStore } from '@reduxjs/toolkit';
import { reduxToolkitSlice } from '../redux-toolkit/slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../rtk-query/api';
import {
  ReducerState,
  reducer as plainReduxReducer,
} from '@/plain-redux/reducer';

export const store = configureStore({
  reducer: {
    plainRedux: plainReduxReducer as Reducer<
      ReducerState,
      UnknownAction,
      ReducerState
    >,
    reduxToolkit: reduxToolkitSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
