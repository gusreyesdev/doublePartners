import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL_SAVE_USER } = getEnvVariables();

export const saveUser = createApi({
  reducerPath: "saveUser",

  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL_SAVE_USER }),

  endpoints: (builder) => ({
    saveUser: builder.mutation<any, Partial<any>>({
      query: (user) => ({
        url: "/user/newUser",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useSaveUserMutation } = saveUser;
