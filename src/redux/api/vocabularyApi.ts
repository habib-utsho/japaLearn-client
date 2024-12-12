import { TQueryParam } from "../../types/index.type"; // Import the type for query parameters
import { baseApi } from "./baseApi";

const vocabularyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVocabulary: builder.mutation({
      query: (payload) => {
        return {
          url: "/vocabulary",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["vocabularies"],
    }),

    getAllVocabularies: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        filters.forEach((item: TQueryParam) => {
          params.append(item.name, item.value as string); // Append filter parameters to the URL
        });

        return {
          url: "/vocabulary",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["vocabularies"], // Ensures this data is cached and linked with the "vocabularies" tag
    }),
    getSingleVocabulary: builder.query({
      query: (id) => {
        return {
          url: `/vocabulary/${id}`,
          method: "GET",
        };
      },
      providesTags: ["vocabularies"],
    }),
    updateVocabulary: builder.mutation({
      query: (payload) => {
        return {
          url: `/vocabulary/${payload.id}`,
          method: "PATCH",
          body: payload.body,
        };
      },
      invalidatesTags: ["vocabularies", "lessons"],
    }),
    deleteVocabularyById: builder.mutation({
      query: (id: string) => ({
        url: `/vocabulary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vocabularies"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useCreateVocabularyMutation,
  useGetAllVocabulariesQuery,
  useGetSingleVocabularyQuery,
  useDeleteVocabularyByIdMutation,
  useUpdateVocabularyMutation,
} = vocabularyApi;
