import { configureStore } from "@reduxjs/toolkit";

import { searchUsers, searchUser, saveUser } from "../services";

export const store = configureStore({
  reducer: {
    [searchUsers.reducerPath]: searchUsers.reducer,
    [searchUser.reducerPath]: searchUser.reducer,
    [saveUser.reducerPath]: saveUser.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      searchUsers.middleware,
      searchUser.middleware,
      saveUser.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
