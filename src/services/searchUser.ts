import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL_USER } = getEnvVariables();

export const searchUser = createApi({
  reducerPath: "searchUser",

  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL_USER }),

  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (login: string) => `${login}`,
    }),
  }),
});

export const { useGetUserQuery } = searchUser;
