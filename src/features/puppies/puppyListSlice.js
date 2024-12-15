import api from "../../store/api";

/*
TODO: Define the following 4 endpoints:
  1. getPuppies (query)
  2. getPuppy (query)
  3. addPuppy (mutation)
  4. deletePuppy (mutation)

The query endpoints should provide the "Puppy" tag.
The mutation endpoints should invalidate the "Puppy" tag.

(Optional) TODO: Write `transformResponse` and `transformErrorResponse`
functions for each endpoint.
*/

const puppyListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPuppies: builder.query({
      query: () => ({
        url: "/players/",
        method: "GET",
      }),
      providesTags: ["Puppy"],
    }),
    getPuppy: builder.query({
      query: (id) => ({
        url: `/players/${id}`,
        method: "GET",
      }),
      providesTags: ["Puppy"],
    }),
    // id auto populated.
    addPuppy: builder.mutation({
      query: ({ name, breed, imageUrl }) => ({
        url: `/players/`,
        method: "POST",
        body: {
          name,
          breed,
          imageUrl,
          // the rest of properties are either auto generated or not necessary (Aaron).
          // status,
          // createdAt, // auto-generated
          // updatedAt,
          // teamId,
          // cohortId,
        },
      }),
      invalidatesTags: ["Puppy"],
    }),
    deletePuppy: builder.mutation({
      query: (id) => ({
        url: `/players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
      // provideTags for GETS, invalidateTags for Mutations.
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyListApi;
