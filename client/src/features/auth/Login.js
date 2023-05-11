import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'
import Spinner from '../../components/Spinner'
import AddResumePublic from '../resume/AddResumePublic'
import useTitle from '../../hooks/useTitle'

const Login = () => {
    useTitle("Login")
    
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return (<Spinner />)

    const content = (
        <>
            <form onSubmit={handleSubmit}>
                <div class="login-page">
                    <div class="row">
                        <div class="r-login col-8">
                            <div class="row justify-content-content">
                                <AddResumePublic></AddResumePublic>
                            </div>
                            <div style={{ margin: '20px 0px 0px 0px' }} class="row justify-content-content">
                                <Link to="/viewVacancy" class="text-light">View Available Vacancies</Link>
                            </div>
                        </div>
                        <div class="l-login col-4">
                            <div>
                                <div class="row justify-content-center">
                                    <h2 class="login-title">Login</h2>
                                </div>
                                <div class="row justify-content-center">
                                    <div style={{ marginTop: '30px' }} class="col-12">
                                        <label class="form-label">Username</label>
                                        <input
                                            class="form-control"
                                            type="text"
                                            id="username"
                                            ref={userRef}
                                            value={username}
                                            onChange={handleUserInput}
                                            autoComplete="off"
                                            required
                                        />
                                    </div>
                                    <div style={{ marginTop: '30px' }} class="col-12">
                                        <label class="form-label">Password</label>
                                        <input
                                            class="form-control"
                                            type="password"
                                            id="password"
                                            onChange={handlePwdInput}
                                            value={password}
                                            required
                                        />
                                    </div>
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="persist"
                                            onChange={handleToggle}
                                            checked={persist}
                                        />
                                        <label class="form-label" for="flexCheckChecked">
                                            Trust This Device
                                        </label>
                                    </div>
                                    <button style={{ marginTop: '30px' }} class="btn btn-primary col-4">Sign In</button>
                                </div>
                                <div style={{ marginTop: '30px' }} class="row justify-content-center">
                                    <h5 ref={errRef} class="form-label text-danger" aria-live="assertive">{errMsg}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}
export default Login