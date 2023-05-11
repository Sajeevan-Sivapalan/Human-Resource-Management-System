import { useState, useEffect } from "react"
import { useUpdateResumeMutation, useDeleteResumeMutation } from "./ResumeApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { storage } from "../../config/firebase"
import { ref, uploadBytes, getDownloadURL, getStorage, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import axios from "axios"
import Spinner from "../../components/Spinner"

const RESUME_REGEX = /^[A-z]{3,20}$/

const EditResumeForm = ({ resume }) => {

    const [updateResume, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateResumeMutation()

    const [deleteResume, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteResumeMutation()

    const navigate = useNavigate()

    const [fullname, setResumename] = useState(resume.fullname)
    const [validResumename, setValidResumename] = useState(false)
    const [forthepostof, setPost] = useState(resume.forthepostof)
    const [validPost] = useState(true)
    const [resumess, setResume] = useState('')
    const [validResume] = useState(true)
    const [requirements, setRequirements] = useState([])
    const [match, setMatch] = useState('')

    useEffect(() => {
        setValidResumename(RESUME_REGEX.test(fullname))
    }, [fullname])


    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setResumename('')
            setPost('')
            setResume('')
            navigate('/dash/admin/resume/search')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onResumenameChanged = e => setResumename(e.target.value)
    const onPostChanged = e => setPost(e.target.value)


    const onSaveResumeClicked = async (e) => {
        console.log(resumess)
        await updateResume({ id: resume.id, fullname, forthepostof, resumess, match })
    }


    const onDeleteResumeClicked = async () => {
        await deleteResume({ id: resume.id })
    }

    let canSave
    canSave = [validResumename, validPost].every(Boolean) && !isLoading


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validResumeNameClass = !validResumename ? 'form__input--incomplete' : ''
    const validPostClass = !validPost ? 'form__input--incomplete' : ''
    const validResumeClass = !validResume ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
    const [postOptions, setPostOptions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/jobopenings')
            .then(response => {
                const options = response.data.map(job => job.jobtitle)
                setPostOptions(options)
                document.getElementById("loading").style.display = "none";
            })
            .catch(error => console.log(error))
    }, [])

    const handlePostChange = (e) => {
        setPost(e.target.value)
        axios.get('http://localhost:5000/jobopenings')
            .then(response => {
                const jobOpenings = response.data;

                jobOpenings.map(job => {
                    if (job.jobtitle === e.target.value) {
                        setRequirements(job.requirements)
                    }
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    const [fileUpload, setFileUpload] = useState()
    const uploadFile = () => {
        if (fileUpload == null) return;
        const extension = fileUpload.name.split(".").pop();
        if (extension.toLowerCase() !== "pdf") {
            alert("Only PDF files are allowed.");
            return;
        }
        const fileRef = ref(storage, `resumes/${fileUpload.name + v4()}`)
        uploadBytes(fileRef, fileUpload).then((snapshot) => {
            document.getElementById("loading").style.display = "flex";
            getDownloadURL(snapshot.ref).then((url) => {
                setResume(url)
                alert("Resume Uploaded")
                const data = { resume: url, requirements: requirements };
                axios.post('http://localhost:5000/run-python-script', data)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data === 1) {
                            alert('Congratulations! Your resume matches the requirements.');
                            setMatch("yes")
                        } else {
                            alert('Resume did not match requirements. You can still submit if you want to, else update your resume and try again.');
                            setMatch("no")
                        }
                        document.getElementById("loading").style.display = "none";
                        // TODO: Handle response data as required
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("error")
                        // TODO: Handle error as required
                    });
            });
        })

    };

    const content = (
        <>
            <div style={{ marginTop: '90px' }} class="leave-list">
                <div class="row justify-content-center">
                    <form onSubmit={e => e.preventDefault()}>
                        <div class="form-group">
                            <div class="row justify-content-center">
                                <div class="col-4">
                                    <label class="form-label" htmlFor="resumename">
                                        Full Name: <span className="nowrap">[3-20 letters]</span></label>
                                    <input
                                        class="form-control"
                                        id="resumename"
                                        name="resumename"
                                        type="text"
                                        autoComplete="off"
                                        value={fullname}
                                        onChange={onResumenameChanged}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label" htmlFor="forthepostof">
                                        For the Post of </label>
                                    <select
                                        id="forthepostof"
                                        name="forthepostof"
                                        class="form-control"
                                        value={forthepostof}
                                        onChange={handlePostChange}
                                    >
                                        <option value="">Select a job title</option>
                                        {postOptions.map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label class="form-label" htmlFor="resumess">
                                        Resume:</label>
                                    <input
                                        id="resume"
                                        name="resume"
                                        class="form-control"
                                        type="file"
                                        onChange={(e) => {
                                            setFileUpload(e.target.files[0])
                                        }}
                                    />
                                </div>

                                <div class="row justify-content-center">
                                    <p className={errClass}>{errContent}</p>
                                </div>
                                <div class="row justify-content-center">
                                    <button
                                        type="submit"
                                        class="btn btn-primary col-3"
                                        title="Save"
                                        onClick={onSaveResumeClicked}
                                        disabled={!canSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        class="btn btn-danger col-3"
                                        title="Delete"
                                        onClick={onDeleteResumeClicked}
                                    >
                                        Delete
                                    </button>
                                    <button type='button' class="btn btn-primary col-3" onClick={uploadFile}>Submit Resume</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div id="loading">
                {/* <img src="loading.gif" alt="Loading.." /> */}
                <Spinner></Spinner>
            </div>
        </>
    )

    return content
}
export default EditResumeForm