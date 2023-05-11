import { useParams } from 'react-router-dom'
import EditResumeForm from './EditResumeForm'
import { useGetResumesQuery } from "./ResumeApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditResume = () => {
    useTitle(' Edit Resume')

    const { id } = useParams()

    const { resume } = useGetResumesQuery("ResumesList", {
        selectFromResult: ({ data }) => ({
            resume: data?.entities[id]
        }),
    })

    if (!resume) return <PulseLoader color={"#FFF"} />

    const content = <EditResumeForm resume={resume} />

    return content
}
export default EditResume