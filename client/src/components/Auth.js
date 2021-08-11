import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
const Auth = ({ authUrl }) => {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    let body
    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (isAuthenticated) {
        return <Redirect to='/dashboard'></Redirect>
    }
    else {
        body = (
            <>
                {authUrl === "login" && <LoginForm></LoginForm>}
                {authUrl === "register" && <RegisterForm></RegisterForm>}
            </>
        )
    }
    return (
        <div class="auth">
            <h1>Welcome to My App</h1>
            {body}
        </div>
    )
}

export default Auth
