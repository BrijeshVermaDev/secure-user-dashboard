import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

interface SignUpRequest {
  email: string;
  password: string;
}

interface SignUpResponse {
  id: string;
  token: string;
}

interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
}

interface UpdateUserResponse {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  id: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api",
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    createUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (user: any) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
    }),
    fetchUsers: builder.query<any, any>({
      query: (page) => "/users?page=" + page,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLazyFetchUsersQuery,
  useFetchUsersQuery,
  useCreateUserMutation,
} = authApi;
