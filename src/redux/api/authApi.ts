import { TPasswordUpdate, TQueryParam } from "../../types/index.type";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/users",
          method: "POST",
          body: userInfo,
          credentials: "include",
        };
      },
    }),
    signin: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
          credentials: "include",
        };
      },
    }),
    getAllUser: builder.query({
      query: (filter: TQueryParam[]) => {
        const params = new URLSearchParams();
        filter.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string);
        });
        return {
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["users"],
    }),
    toggleUserRole: builder.mutation({
      query: (id: string) => {
        return {
          url: `/users/toggle-role/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["users"],
    }),
    changePassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: payload,
        };
      },
    }),
    forgetPassword: builder.mutation({
      query: (payload) => {
        return {
          url: "/auth/forget-password",
          method: "POST",
          body: payload,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (payload) => {
        const resetToken = payload.token;
        delete payload.token;
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: payload,
          headers: {
            Authorization: `Bearer ${resetToken}`,
          },
        };
      },
    }),
    getMe: builder.query({
      query: (token: string) => {
        return {
          url: "/users/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["users"],
    }),
    editPassword: builder.mutation({
      query: ({
        id,
        payload,
      }: {
        id: string;
        payload: Partial<TPasswordUpdate>;
      }) => {
        return {
          url: `/auth/users/edit-password/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useToggleUserRoleMutation,
  useChangePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useEditPasswordMutation,
  useGetMeQuery,
} = authApi;
