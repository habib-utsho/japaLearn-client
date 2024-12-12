import { TQueryParam } from "../../types/index.type"; // Import the type for query parameters
import { baseApi } from "./baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation({
      query: (payload) => {
        return {
          url: "/lesson",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["lessons"],
    }),

    getAllLessons: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string); // Append filter parameters to the URL
        });

        return {
          url: "/lesson",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["lessons"], // Ensures this data is cached and linked with the "lesson" tag
    }),
    getSingleLesson: builder.query({
      query: (id) => {
        return {
          url: `/lesson/${id}`,
          method: "GET",
        };
      },
      providesTags: ["lessons"],
    }),
    updateLesson: builder.mutation({
      query: (payload) => {
        return {
          url: `/lesson/${payload.id}`,
          method: "PATCH",
          body: payload.body,
        };
      },
      invalidatesTags: ["lessons"],
    }),
    deleteLessonById: builder.mutation({
      query: (id: string) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["lessons"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useCreateLessonMutation,
  useGetAllLessonsQuery,
  useGetSingleLessonQuery,
  useDeleteLessonByIdMutation,
  useUpdateLessonMutation,
} = lessonApi;
