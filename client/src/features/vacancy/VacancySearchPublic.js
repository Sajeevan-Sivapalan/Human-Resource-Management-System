import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const VacancySearchPublic = ({ vacancy }) => {
    const RequirementsString = vacancy.requirements.toString().replaceAll(',', ', ')
    return (
        <table class="table table-striped table-hover mx-auto" style={{ borderSpacing: '0 10px', width: '90%' }}>
            <tbody>
                <tr>
                    <td class="text-center" style={{ width: "25%" }}>{vacancy.jobtitle}</td>
                    <td class="text-center" style={{ width: "25%" }}>{vacancy.description}</td>
                    <td class="text-center" style={{ width: "25%" }}>{RequirementsString}</td>
                </tr>
            </tbody>
        </table>
    )

}

export default VacancySearchPublic
