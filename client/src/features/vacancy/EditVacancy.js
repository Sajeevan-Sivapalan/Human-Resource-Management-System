import { useParams } from 'react-router-dom'
import EditVacancyForm from './EditVacancyForm'
import { useGetVacancysQuery } from "./VacancyApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditVacancy = () => {
    useTitle('Edit Vacancy')

    const { id } = useParams()

    const { vacancy } = useGetVacancysQuery("VacancysList", {
        selectFromResult: ({ data }) => ({
            vacancy: data?.entities[id]
        }),
    })

    if (!vacancy) return <PulseLoader color={"#FFF"} />

    const content = <EditVacancyForm vacancy={vacancy} />

    return content
}
export default EditVacancy