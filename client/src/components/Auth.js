import React from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = ({ authUrl }) => {
    return (
        <div class="auth">
            <h1>Welcome to My App</h1>
            {authUrl === "login" && <LoginForm></LoginForm>}
            {authUrl === "register" && <RegisterForm></RegisterForm>}
        </div>
    )
}

export default Auth
