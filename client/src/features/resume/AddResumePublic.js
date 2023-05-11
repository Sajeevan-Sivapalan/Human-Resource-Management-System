import { useState, useEffect } from "react"
import { useAddNewResumeMutation } from "./ResumeApiSlice"
import { useNavigate } from "react-router-dom"
import useTitle from "../../hooks/useTitle"
import { storage } from "../../config/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from "axios"
import Spinner from "../../components/Spinner"


const USER_REGEX = /^[A-z]{3,20}$/


const AddResumePublic = () => {
    useTitle(' New Resume')

    const [addNewResume, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewResumeMutation()

    const navigate = useNavigate()

    const [fullname, setResumename] = useState('')
    const [validResumename, setValidResumename] = useState(false)
    const [forthepostof, setPost] = useState('')
    const [validPost] = useState(true)
    const [resumess, setResume] = useState('')
    const [validResume] = useState(true)
    const [postOptions, setPostOptions] = useState([])
    const [requirements, setRequirements] = useState([])
    const [match, setMatch] = useState('')
    const [loading, setLoading] = useState(false)

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
    useEffect(() => {
    }, [requirements]);

    useEffect(() => {
        setValidResumename(USER_REGEX.test(fullname))
    }, [fullname])




    useEffect(() => {
        if (isSuccess) {
            setResumename('')
            setPost('')
            setResume('')
            window.location.replace('http://localhost:3000/');
        }
    }, [isSuccess, navigate])

    const onResumenameChanged = e => setResumename(e.target.value)
    const onPostChanged = e => setPost(e.target.value)


    const canSave = [validResumename].every(Boolean) && !isLoading

    const onSaveResumeClicked = async (e) => {
        e.preventDefault()
        console.log("can save 1`")
        if (canSave) {
            console.log("can save")
            await addNewResume({ fullname, forthepostof, resumess, match })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validResumeNameClass = !validResumename ? 'form__input--incomplete' : ''
    const validPostClass = !validPost ? 'form__input--incomplete' : ''
    const validResumeClass = !validResume ? 'form__input--incomplete' : ''


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
            getDownloadURL(snapshot.ref).then((url) => {
                setLoading(true)
                setResume(url)
                alert("Resume Uploaded")
                const data = { resume: url, requirements: requirements };
                axios.post('http://localhost:5000/run-python-script', data)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data === 1) {
                            alert('Congratulations! Your resume matches the requirements.');
                            setMatch("yes")
                            setLoading(false)
                        } else {
                            alert('Resume did not match requirements. You can still submit if you want to, else update your resume and try again.');
                            setMatch("no")
                            setLoading(false)
                        }
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
        // <>
        //     <p className={errClass}>{error?.data?.message}</p>

        //     <form className="form" onSubmit={onSaveResumeClicked}>
        //         <div className="form__title-row">
        //             <h2>New Resume</h2>
        //             <div className="form__action-buttons">
        //                 <button
        //                     type="submit"
        //                     className="icon-button"
        //                     title="Save"
        //                     disabled={!canSave}
        //                 >
        //                     <FontAwesomeIcon icon={faSave} />
        //                 </button>
        //             </div>
        //         </div>
        //         <label className="form__label" htmlFor="fullname">
        //             Full Name: <span className="nowrap">[3-20 letters]</span></label>
        //         <input
        //             className={`form__input ${validResumeNameClass}`}
        //             id="fullname"
        //             name="fullname"
        //             type="text"
        //             autoComplete="off"
        //             value={fullname}
        //             onChange={onResumenameChanged}
        //         />

        //         <label className="form__label" htmlFor="forthepostof">
        //             For the Post Of: <span className="nowrap"></span></label>
        //         <select
        //         id="forthepostof"
        //         name="forthepostof"
        //         value={forthepostof}
        //         onChange={handlePostChange}
        //         >
        //         <option value="">Select a job title</option>
        //         {postOptions.map(option => (
        //         <option key={option} value={option}>{option}</option>
        //         ))}
        //         </select>

        //         <label className="form__label" htmlFor="resumess">
        //             Resume: <span className="nowrap"></span></label>
        //         <input
        //             className={`form__input ${validResumeClass}`}
        //             id="resumess"
        //             name="resumess"
        //             type="file"
        //             onChange={(e)=>{
        //                 setFileUpload(e.target.files[0])
        //             }}
        //         />
        //         <button type="button" onClick={uploadFile}>Submit Resume</button>

        //     </form>
        //     <div id="loading">
        //     <img src="loading.gif" alt="Loading.." />
        //     </div>
        // </>

        //         <>
        //             <p class={errClass}>{error?.data?.message}</p>

        //             <form class="form" onSubmit={onSaveResumeClicked}>
        //                 <div class="form__title-row">
        //                     <h2>New Resume</h2>
        //                     <div class="form__action-buttons">
        //                         <button
        //                             type="submit"
        //                             class="icon-button"
        //                             title="Save"
        //                             disabled={!canSave}
        //                         >
        //                             <FontAwesomeIcon icon={faSave} />
        //                         </button>
        //                     </div>
        //                 </div>

        //                 <div class="col-6">

        //                 <label class="form-control" htmlFor="fullname">
        //                     Full Name: </label>
        //                 <input
        //                     class={`form-control ${validResumeNameClass}`}
        //                     id="fullname"
        //                     name="fullname"
        //                     type="text"
        //                     autoComplete="off"
        //                     value={fullname}
        //                     onChange={onResumenameChanged}
        //                 />
        //                 </div>

        //                 <div class="col-6">

        //                 <label class="form-control" htmlFor="forthepostof">
        //                     For the Post Of: </label>
        //                 <select
        //                 id="forthepostof"
        //                 name="forthepostof"
        //                 value={forthepostof}
        //                 onChange={handlePostChange}
        //                 >
        //                 <option value="">Select a job title</option>
        //                 {postOptions.map(option => (
        //                 <option key={option} value={option}>{option}</option>
        //                 ))}
        //                 </select>

        // </div>

        // <div class="col-6">


        //                 <label class="form-control" htmlFor="resumess">
        //                     Resume: </label>
        //                 <input
        //                     class={`form-control ${validResumeClass}`}
        //                     id="resumess"
        //                     name="resumess"
        //                     type="file"
        //                     onChange={(e)=>{
        //                         setFileUpload(e.target.files[0])
        //                     }}
        //                 />
        //                 <button type="button" onClick={uploadFile}>Submit Resume</button>
        // </div>
        //             </form>
        //             <div id="loading">
        //             <img src="loading.gif" alt="Loading.." />
        //             </div>
        //         </>

        <>

            <button type="button" class="btn btn-outline-light " data-bs-toggle="modal" data-bs-target="#addresume1">
                Upload  your resume here to match against our vacancies
            </button>
            <div class="modal fade" id="addresume1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">New Resume</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={onSaveResumeClicked}>
                                <div class="row">
                                    <div class="col-6">

                                        
                                        <input
                                            class="form-control"
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            autoComplete="off"
                                            value={fullname}
                                            onChange={onResumenameChanged}
                                            placeholder="Full name"
                                        />
                                    </div>

                                    <div class="col-6">
                                        <select
                                            id="forthepostof"
                                            class="form-control"
                                            name="forthepostof"
                                            value={forthepostof}
                                            onChange={handlePostChange}
                                        >
                                            <option value="">Select a job title</option>
                                            {postOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>

                                    </div>

                                    <div class="col-6">


                                        <label class="form-label" htmlFor="resumess">
                                            Resume: </label>
                                        <input
                                            class="form-control"
                                            id="resumess"
                                            name="resumess"
                                            type="file"
                                            onChange={(e) => {
                                                setFileUpload(e.target.files[0])
                                            }}
                                        />

                                    </div>
                                    {loading ? <Spinner /> : null}
                                    <div class="row justify-content-center">
                                        <p class={errClass}>{error?.data?.message}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary" onClick={uploadFile}>Submit Resume</button>
                                        <button
                                            type="submit"
                                            class="btn btn-primary"
                                            title="Save"
                                            onClick={onSaveResumeClicked}
                                            disabled={!canSave}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return content
}
export default AddResumePublic