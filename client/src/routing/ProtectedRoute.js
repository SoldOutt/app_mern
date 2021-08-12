import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Navigation from '../components/Navigation'
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext)

    if (authLoading) {
        return (
            <div className="center_box">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }
    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    isAuthenticated ? (
                        <>
                            <Navigation />
                            <Component {...rest} {...props}>
                            </Component>
                        </>
                    ) : (
                        <Redirect to="/login"></Redirect>
                    )
                }
            />
        </>
    )
}

export default ProtectedRoute
