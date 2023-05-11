import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetVacancysQuery } from './VacancyApiSlice'
import { memo } from 'react'

const Vacancy = ({ vacancyId }) => {

    const { vacancy } = useGetVacancysQuery("vacancysList", {
        selectFromResult: ({ data }) => ({
            vacancy: data?.entities[vacancyId]
        }),
    })

    const navigate = useNavigate()

    if (vacancy) {
        const handleEdit = () => navigate(`/dash/admin/vacancy/${vacancyId}`)

         const RequirementsString = vacancy.requirements.toString().replaceAll(',', ', ')
        const cellStatus = vacancy.active ? '' : 'table__cell--inactive'

        return (
            <tr >
                <td>{vacancy.jobtitle}</td>
                <td>{vacancy.description}</td>
                <td>{RequirementsString}</td>
                <td>
                    <button
                        class="btn btn-primary"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedVacancy = memo(Vacancy)

export default memoizedVacancy