import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToFile, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const Resume = ({ resume }) => {

    const navigate = useNavigate()

    const handleEdit = () => navigate(`/dash/admin/resume/${resume._id}`)
    const handleFile = () => window.location.href = (resume.resumess)

    const cellStatus = resume.active ? '' : 'table__cell--inactive'
    return (

        <>
            <div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">For the Post of</th>
                                    <th scope="col">Resume</th>
                                    <th scope="col">Match</th>
                                    <th scope="col">Edit</th>
                                </tr>

                            </thead>

                            <tbody>
                                <tr>
                                    <td>{resume.fullname}</td>
                                    <td>{resume.forthepostof}</td>
                                    <td>
                                        <button
                                            class="btn btn-primary"
                                            onClick={handleFile}
                                        >
                                            View File
                                        </button>
                                    </td>
                                    <td>{resume.match}</td>
                                    <td>
                                        <button
                                            class="btn btn-primary"
                                            onClick={handleEdit}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
        </>
    )
}
export default Resume