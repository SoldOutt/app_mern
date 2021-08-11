import { API_URL } from './Constands'
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { authReducer } from '../reducers/authReducer'
import setAuthToken from '../utils/setAuthToken'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    const loadUser = async () => {
        if (localStorage['tokenUser']) {
            setAuthToken(localStorage['tokenUser'])
        }
        try {
            const response = await axios.get(`${API_URL}/auth`)
            if (response.data.success) {
                dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: true, user: response.data.user } })
            }
        } catch (error) {
            localStorage.removeItem('userToken')
            setAuthToken(null)
            dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null } })
        }
    }

    useEffect(() => loadUser(), [])


    //login
    const loginUser = async useForm => {
        try {

            const response = await axios.post(`${API_URL}/auth/login`, useForm)
            if (response.data.success) {
                localStorage.setItem('tokenUser', response.data.acessToken)
                loadUser()
            }
            return response.data
        }
        catch (err) {
            if (err.response.data) return err.response.data
            else {
                return { success: false, message: err.message }
            }
        }
    }

    //Xuat ra ngoai
    const authContextData = { loginUser, authState }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider