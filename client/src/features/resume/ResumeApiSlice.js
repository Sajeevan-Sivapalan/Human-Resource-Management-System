import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const resumesAdapter = createEntityAdapter({})

const initialState = resumesAdapter.getInitialState()

export const resumesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getResumes: builder.query({
            query: () => ({
                url: '/resume',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedResumes = responseData.map(resume => {
                    resume.id = resume._id
                    return resume
                });
                return resumesAdapter.setAll(initialState, loadedResumes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Resume', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Resume', id }))
                    ]
                } else return [{ type: 'Resume', id: 'LIST' }]
            }
        }),
        addNewResume: builder.mutation({
            query: initialResumeData => ({
                url: '/resume',
                method: 'POST',
                body: {
                    ...initialResumeData,
                }
            }),
            invalidatesTags: [
                { type: 'Resume', id: "LIST" }
            ]
        }),
        updateResume: builder.mutation({
            query: initialResumeData => ({
                url: '/resume',
                method: 'PATCH',
                body: {
                    ...initialResumeData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Resume', id: arg.id }
            ]
        }),
        deleteResume: builder.mutation({
            query: ({ id }) => ({
                url: `/resume`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Resume', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetResumesQuery,
    useAddNewResumeMutation,
    useUpdateResumeMutation,
    useDeleteResumeMutation,
} = resumesApiSlice

// returns the query result object
export const selectResumesResult = resumesApiSlice.endpoints.getResumes.select()

// creates memoized selector
const selectResumesData = createSelector(
    selectResumesResult,
    resumesResult => resumesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllResumes,
    selectById: selectResumeById,
    selectIds: selectResumeIds
    // Pass in a selector that returns the resumes slice of state
} = resumesAdapter.getSelectors(state => selectResumesData(state) ?? initialState)