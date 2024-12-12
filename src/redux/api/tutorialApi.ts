import { TQueryParam } from "../../types/index.type"; // Import the type for query parameters
import { baseApi } from "./baseApi";

const tutorialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTutorial: builder.mutation({
      query: (payload) => {
        return {
          url: "/tutorial",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["tutorials"],
    }),

    getAllTutorials: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string); // Append filter parameters to the URL
        });

        return {
          url: "/tutorial",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["tutorials"], // Ensures this data is cached and linked with the "tutorials" tag
    }),
    getSingleTutorial: builder.query({
      query: (id) => {
        return {
          url: `/tutorial/${id}`,
          method: "GET",
        };
      },
      providesTags: ["tutorials"],
    }),
    updateTutorial: builder.mutation({
      query: (payload) => {
        return {
          url: `/tutorial/${payload.id}`,
          method: "PATCH",
          body: payload.body,
        };
      },
      invalidatesTags: ["tutorials"],
    }),
    deleteTutorialById: builder.mutation({
      query: (id: string) => ({
        url: `/tutorial/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tutorials"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useCreateTutorialMutation,
  useGetAllTutorialsQuery,
  useGetSingleTutorialQuery,
  useDeleteTutorialByIdMutation,
  useUpdateTutorialMutation,
} = tutorialApi;
