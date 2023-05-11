import { useGetResumesQuery } from "../resume/ResumeApiSlice"
import Resume from '../resume/Resume'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from 'react-router-dom'

const ResumesList = () => {
    useTitle(' Resumes List')

    const navigate = useNavigate()
    const {
        data: resumes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetResumesQuery('resumesList', {
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
        const searchfunction = () => navigate(`/dash/admin/resume/search`)

        const { ids } = resumes

        var tableContent = ids?.length && ids.map(resumeId => <Resume key={resumeId} resumeId={resumeId} />)
        console.log(tableContent)
        content = (
            <div>
                <div>
                    <table class="table table-striped table-hover">
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
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return content
}
export default ResumesList