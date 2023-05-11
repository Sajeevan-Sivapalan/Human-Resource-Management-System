import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToFile, faPenToSquare,faSearch,faClose } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetResumesQuery } from './ResumeApiSlice'
import { memo } from 'react'


const Resume = ({ resumeId }) => {

    const { resume } = useGetResumesQuery("resumesList", {
        selectFromResult: ({ data }) => ({
            resume: data?.entities[resumeId]
        }),
    })

     

    const navigate = useNavigate()

    if (resume) {
        const handleEdit = () => navigate(`/dash/admin/resume/${resumeId}`)
        const handleFile = () => window.location.href =(resume.resumess)

        const cellStatus = resume.active ? '' : 'table__cell--inactive'

        return (

                
        
            <tr>
                <td>{resume.fullname}</td>
                <td>{resume.forthepostof}</td>
                <td>
                    <button
                        class="btn btn-primary"
                        onClick={handleFile}
                    >
                        View
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
        )

    } else return null
}

const memoizedResume = memo(Resume)

export default memoizedResume