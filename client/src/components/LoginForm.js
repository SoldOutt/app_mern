import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import AlertMessage from './AlertMessage'
const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const [alert, setAlert] = useState(null)
    const onChangeLonginForm = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        })
        setAlert(null)
    }

    const history = useHistory()
    //context
    const { loginUser } = useContext(AuthContext)
    const login = async (event) => {
        event.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            console.log(loginData)
            if (loginData.success) history.push('/')
            else {
                setAlert({ type: 'danger', message: loginData.message })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={login} method="post">
                <AlertMessage info={alert} />
                <div className="form_group">
                    <input
                        placeholder="User Name"
                        value={loginForm.username}
                        onChange={onChangeLonginForm}
                        name="username"
                        type="text"
                    ></input>
                </div>
                <div className="form_group">
                    <input
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={onChangeLonginForm}
                        name="password"
                        type="password"
                    ></input>
                </div>
                <button className="btn btn-dark">Đăng Nhập</button>
                <p>
                    Do you have an account? <a href="/register">Đăng kí ngay</a>
                </p>
            </form>
        </div>
    )
}

export default Login
