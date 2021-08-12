import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import AlertMessage from './AlertMessage'
const RegisterForm = () => {
    const history = useHistory()
    const { registerUser } = useContext(AuthContext)
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmpassword: '',
    })
    const [alert, setAlert] = useState(null)
    const onChangeForm = (event) => {
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        })
    }
    const register = async (event) => {
        event.preventDefault()
        try {
            const registerData = await registerUser(registerForm)
            console.log(registerData)
            if (registerData.success) {
                history.push('/login')
                setAlert({
                    type: 'primary',
                    message: registerData.message,
                })
            } else {
                setAlert({ type: 'danger', message: registerData.message })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form onSubmit={register}>
                <AlertMessage info={alert} />
                <div className="form_group">
                    <input
                        placeholder="User Name"
                        type="text"
                        value={registerForm.username}
                        name="username"
                        onChange={onChangeForm}
                    ></input>
                </div>
                <div className="form_group">
                    <input
                        placeholder="Password"
                        type="password"
                        value={registerForm.password}
                        name="password"
                        onChange={onChangeForm}
                    ></input>
                </div>
                <div className="form_group">
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        value={registerForm.confirmpassword}
                        name="confirmpassword"
                        onChange={onChangeForm}
                    ></input>
                </div>
                <button className="btn btn-dark">Đăng Ký</button>
                <p>
                    Do you have an account? <a href="/login">Đăng nhập ngay</a>
                </p>
            </form>
        </div>
    )
}

export default RegisterForm
