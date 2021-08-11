import React from 'react'

const RegisterForm = () => {
    return (
        <div>
            <form>
                <div className="form_group">
                    <input placeholder="User Name" type="text"></input>
                </div>
                <div className="form_group">
                    <input placeholder="Password" type="password"></input>
                </div>
                <div className="form_group">
                    <input placeholder="Confirm Password" type="password"></input>
                </div>
                <button className="btn btn-dark">Đăng Ký</button>
                <p>Do you have an account? <a href="/login">Đăng nhập ngay</a></p>
            </form>
        </div>
    )
}

export default RegisterForm
