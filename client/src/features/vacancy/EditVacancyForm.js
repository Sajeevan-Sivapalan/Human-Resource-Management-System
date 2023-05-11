import { useState, useEffect } from "react"
import { useUpdateVacancyMutation, useDeleteVacancyMutation } from "./VacancyApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const RESUME_REGEX = /^[A-z]{3,20}$/

const EditVacancyForm = ({ vacancy }) => {

    const [updateVacancy, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateVacancyMutation()

    const [deleteVacancy, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteVacancyMutation()

    const navigate = useNavigate()

    const [jobtitle, setVacancyname] = useState(vacancy.jobtitle)
    const [validVacancyname, setValidVacancyname] = useState(false)
    const [description, setPost] = useState(vacancy.description)
    const [validPost] = useState(true)
    var [requirements, setVacancy] = useState(vacancy.requirements)
    const [validVacancy] = useState(true)
    var [tags, setTags] = useState([])

    useEffect(() => {
        setValidVacancyname(RESUME_REGEX.test(jobtitle))
    }, [jobtitle])


    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setVacancyname('')
            setPost('')
            setVacancy('')
            navigate('/dash/admin/vacancy/search')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onVacancynameChanged = e => setVacancyname(e.target.value)
    const onPostChanged = e => setPost(e.target.value)
    const onVacancyChanged = e => setVacancy(e.target.value)

    const onSaveVacancyClicked = async (e) => {
        e.preventDefault()
        requirements = tags
        await updateVacancy({ id: vacancy.id, jobtitle, description, requirements })
    }




    const onDeleteVacancyClicked = async () => {
        await deleteVacancy({ id: vacancy.id })
    }

    let canSave
    canSave = [validVacancyname, validPost].every(Boolean) && !isLoading


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validVacancyNameClass = !validVacancyname ? 'form__input--incomplete' : ''
    const validPostClass = !validPost ? 'form__input--incomplete' : ''
    const validVacancyClass = !validVacancy ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


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
        //     <p className={errClass}>{errContent}</p>

        //     <form className="form" onSubmit={e => e.preventDefault()}>
        //         <div className="form__title-row">
        //             <h2>Edit Vacancy</h2>
        //             <div className="form__action-buttons">
        //                 <button
        //                     className="icon-button"
        //                     title="Save"
        //                     onClick={onSaveVacancyClicked}
        //                     disabled={!canSave}
        //                 >
        //                     <FontAwesomeIcon icon={faSave} />
        //                 </button>
        //                 <button
        //                     className="icon-button"
        //                     title="Delete"
        //                     onClick={onDeleteVacancyClicked}
        //                 >
        //                     <FontAwesomeIcon icon={faTrashCan} />
        //                 </button>
        //             </div>
        //         </div>
        //         <label className="form__label" htmlFor="vacancyname">
        //             Job Title: <span className="nowrap">[3-20 letters]</span></label>
        //         <input
        //             className={`form__input ${validVacancyNameClass}`}
        //             id="vacancyname"
        //             name="vacancyname"
        //             type="text"
        //             autoComplete="off"
        //             value={jobtitle}
        //             onChange={onVacancynameChanged}
        //         />

        //         <label className="form__label" htmlFor="description">
        //             Description : <span className="nowrap"></span></label>
        //         <input
        //             className={`form__input ${validPostClass}`}
        //             id="post"
        //             name="post"
        //             type="text"
        //             value={description}
        //             onChange={onPostChanged}
        //         />


        //         <label className="form__label" htmlFor="requirements">
        //             Requirements: <span className="nowrap"></span></label>
        //         <div >
        //     { tags.map((tag, index) => (
        //         <div className="tag-item" key={index}>
        //             <span className="text">{tag}</span>
        //             <span className="close" onClick={() => removeTag(index)}>&times;</span>
        //         </div>
        //     )) }
        //     <input className='form__input' onKeyDown={handleKeyDown} type="text"  placeholder="Enter Requirements"  />
        // </div>

        //     </form>
        // </>

        <>
            <div style={{ marginTop: '90px' }} class="leave-list">
                <div class="row justify-content-center">
                    <form onSubmit={e => e.preventDefault()}>
                        <div class="form-group">
                            <div class="row justify-content-center">
                                <div class="col-4">
                                    <label class="form-label" htmlFor="vacancyname">
                                        Job Title</label>
                                    <input
                                        class="form-control"
                                        id="vacancyname"
                                        name="vacancyname"
                                        type="text"
                                        autoComplete="off"
                                        value={jobtitle}
                                        onChange={onVacancynameChanged}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label" htmlFor="description">
                                        Description </label>
                                    <input
                                        class="form-control"
                                        id="post"
                                        name="post"
                                        type="text"
                                        value={description}
                                        onChange={onPostChanged}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label" htmlFor="requirements">
                                        Requirements</label>
                                    <div >
                                        {tags.map((tag, index) => (
                                            <div className="tag-item" key={index}>
                                                <span className="text">{tag}</span>
                                                <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                            </div>
                                        ))}
                                        <input class="form-control" onKeyDown={handleKeyDown} type="text" placeholder="Enter Requirements" />
                                    </div>
                                    <div class="row justify-content-center">
                                    <span class={errClass}>{errContent}</span>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <button style={{ marginTop: '10px' }} type="submit" class="btn btn-primary col-3" onClick={onSaveVacancyClicked}>
                                        Update
                                    </button>
                                    <button
                                        style={{ marginTop: '10px' }}
                                        class="btn btn-danger col-3"
                                        onClick={onDeleteVacancyClicked}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    return content
}
export default EditVacancyForm