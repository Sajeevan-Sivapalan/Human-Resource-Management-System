import { useState, useEffect } from "react"
import { useAddNewVacancyMutation } from "./VacancyApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z]{3,20}$/

const NewVacancyForm = () => {
    useTitle('Vacancy')

    const [addNewVacancy, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewVacancyMutation()

    const navigate = useNavigate()

    const [jobtitle, setVacancyname] = useState('')
    const [validVacancyname, setValidVacancyname] = useState(false)
    const [description, setPost] = useState('')
    const [validPost] = useState(true)

    useEffect(() => {
        setValidVacancyname(USER_REGEX.test(jobtitle))
    }, [jobtitle])




    useEffect(() => {
        if (isSuccess) {
            setVacancyname('')
            setPost('')
            window.location.replace('http://localhost:3000/dash/admin/vacancy/search');
        }
    }, [isSuccess, navigate])

    const onVacancynameChanged = e => setVacancyname(e.target.value)
    const onPostChanged = e => setPost(e.target.value)


    const canSave = [validVacancyname].every(Boolean) && !isLoading

    const onSaveVacancyClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            const requirements = tags
            await addNewVacancy({ jobtitle, description, requirements })
        }
    }


     const errClass = isError ? "errmsg" : "offscreen"
     const validVacancyNameClass = !validVacancyname ? 'form__input--incomplete' : ''
     const validPostClass = !validPost ? 'form__input--incomplete' : ''
     const [tags, setTags] = useState([])

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
        console.log(tags)
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    const content = (
        // <>
        //     <p className={errClass}>{error?.data?.message}</p>

        //     <form className="form" onSubmit={onSaveVacancyClicked}>
        //         <div className="form__title-row">
        //             <h2>New Vacancy</h2>
        //             <div className="form__action-buttons">
        //                 <button
        //                     className="icon-button"
        //                     title="Save"
        //                     disabled={!canSave}
        //                 >
        //                     <FontAwesomeIcon icon={faSave} />
        //                 </button>
        //             </div>
        //         </div>
        //         <label className="form__label" htmlFor="jobtitle">
        //             Job Title: <span className="nowrap">[3-20 letters]</span></label>
        //         <input
        //             className={`form__input ${validVacancyNameClass}`}
        //             id="jobtitle"
        //             name="jobtitle"
        //             type="text"
        //             autoComplete="off"
        //             value={jobtitle}
        //             onChange={onVacancynameChanged}
        //         />

        //         <label className="form__label" htmlFor="description">
        //             Description: <span className="nowrap"></span></label>
        //         <input
        //             className={`form__input ${validPostClass}`}
        //             id="description"
        //             name="description"
        //             type="text"
        //             value={description}
        //             onChange={onPostChanged}
        //         />

        //         <label className="form__label" htmlFor="requirements">
        //             Requirements: <span className="nowrap"></span></label>
        //         <div className="nowrap">
        //     { tags.map((tag, index) => (
        //         <div className="tag-item" key={index}>
        //             <span className="text">{tag}</span>
        //             <span className="close" onClick={() => removeTag(index)}>&times;</span>
        //         </div>
        //     )) }
        //     <input className='form__input' onKeyDown={handleKeyDown} type="text"  placeholder="Enter Requirements" />
        // </div>

        //     </form>
        // </>

        <>
            <div class="request">
                <div class="row justify-content-end">
                    <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#addVacancy">
                        New vacancy
                    </button>
                </div>
            </div>
            <div class="modal fade" id="addVacancy" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">New vacancy</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={onSaveVacancyClicked}>
                                <div class="row">
                                    <div class="col-6">
                                        <label class="form-label">Job Title</label>
                                        <input
                                            class="form-control"
                                            id="jobtitle"
                                            name="jobtitle"
                                            type="text"
                                            autoComplete="off"
                                            value={jobtitle}
                                            onChange={onVacancynameChanged}
                                            required
                                        />
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label">Description</label>
                                        <input
                                            class="form-control"
                                            id="description"
                                            name="description"
                                            type="text"
                                            value={description}
                                            onChange={onPostChanged}
                                            required
                                        />
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label">Requirements</label>
                                        {tags.map((tag, index) => (
                                            <div className="tag-item" key={index}>
                                                <span className="text">{tag}</span>
                                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                            </div>
                                        ))}
                                        <input class="form-control" onKeyDown={handleKeyDown} type="text" placeholder="Enter Requirements" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                        <button
                                            class="btn btn-primary"
                                            title="Save"
                                        >
                                            Add
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
export default NewVacancyForm