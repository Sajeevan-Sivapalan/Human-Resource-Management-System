import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const Vacancy = ({ vacancy }) => {

    const navigate = useNavigate()
    const cellStatus = vacancy.active ? '' : 'table__cell--inactive'
    const RequirementsString = vacancy.requirements.toString().replaceAll(',', ', ')
    const handleEdit = () => navigate(`/dash/admin/vacancy/${vacancy._id}`)
    return (
        <table class="table table-striped table-hover mx-auto">
            <tbody>
                <tr>
                    <td class="text-center" style={{ width: "25%" }}>{vacancy.jobtitle}</td>
                    <td class="text-center" style={{ width: "25%" }}>{vacancy.description}</td>
                    <td class="text-center" style={{ width: "25%" }}>{RequirementsString}</td>
                    <td class="text-center" style={{ width: "15%" }}>
                        <button class="btn btn-primary" onClick={handleEdit}>Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )

}

export default Vacancy
