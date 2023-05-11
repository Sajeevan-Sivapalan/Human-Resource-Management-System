import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const vacancysAdapter = createEntityAdapter({})

const initialState = vacancysAdapter.getInitialState()

export const vacancysApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVacancys: builder.query({
            query: () => ({
                url: '/jobopenings',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedVacancys = responseData.map(vacancy => {
                    vacancy.id = vacancy._id
                    return vacancy
                });
                return vacancysAdapter.setAll(initialState, loadedVacancys)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Vacancy', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Vacancy', id }))
                    ]
                } else return [{ type: 'Vacancy', id: 'LIST' }]
            }
        }),
        addNewVacancy: builder.mutation({
            query: initialVacancyData => ({
                url: '/jobopenings',
                method: 'POST',
                body: {
                    ...initialVacancyData,
                }
            }),
            invalidatesTags: [
                { type: 'Vacancy', id: "LIST" }
            ]
        }),
        updateVacancy: builder.mutation({
            query: initialVacancyData => ({
                url: '/jobopenings',
                method: 'PATCH',
                body: {
                    ...initialVacancyData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Vacancy', id: arg.id }
            ]
        }),
        deleteVacancy: builder.mutation({
            query: ({ id }) => ({
                url: `/jobopenings`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Vacancy', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetVacancysQuery,
    useAddNewVacancyMutation,
    useUpdateVacancyMutation,
    useDeleteVacancyMutation,
} = vacancysApiSlice

// returns the query result object
export const selectVacancysResult = vacancysApiSlice.endpoints.getVacancys.select()

// creates memoized selector
const selectVacancysData = createSelector(
    selectVacancysResult,
    vacancysResult => vacancysResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllVacancys,
    selectById: selectVacancyById,
    selectIds: selectVacancyIds
    // Pass in a selector that returns the vacancys slice of state
} = vacancysAdapter.getSelectors(state => selectVacancysData(state) ?? initialState)