import { baseApi } from "./baseApi";

const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => {
        return {
          url: "/stats/admin",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAdminStatsQuery } = statsApi;
