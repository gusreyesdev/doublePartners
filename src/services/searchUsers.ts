import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL_SEARCH } = getEnvVariables();

export const searchUsers = createApi({
  reducerPath: "searchUsers",
  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL_SEARCH }),

  endpoints: (builder) => ({
    getUsers: builder.query<any, string>({
      query: (name: string) => `?q=${name}&per_page=10`,
    }),
  }),
});

export const { useLazyGetUsersQuery } = searchUsers;
