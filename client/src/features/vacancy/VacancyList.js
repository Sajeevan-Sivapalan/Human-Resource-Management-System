import { useGetVacancysQuery } from "../vacancy/VacancyApiSlice"
import Vacancy from '../vacancy/Vacancy'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from 'react-router-dom'

const VacancysList = () => {
    useTitle(' Vacancies List')
    const navigate = useNavigate()

    const {
        data: vacancys,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetVacancysQuery('vacancysList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const searchfunction = () => navigate(`/dash/admin/vacancy/search`)
        const { ids } = vacancys

        const tableContent = ids?.length && ids.map(vacancyId => <Vacancy key={vacancyId} vacancyId={vacancyId} />)

        content = (
            <div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Job Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Requirements</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            </div>
        )
    }

    return content
}
export default VacancysList