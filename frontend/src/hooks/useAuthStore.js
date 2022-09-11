import {useSelector, useDispatch} from 'react-redux'
import calendarApi from '../api/calendarApi'
import {onChecking, onLogin, onLogout, clearErrorMessage} from '../store/auth/authSlice'

export const useAuthStore = ()=>{

    const {status, user, errorMessage} = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    const startLogin = async({email, password})=>{
        dispatch( onChecking())
        

        try {
            
            const {data} = await calendarApi.post('/auth', {email, password})
            console.log(data)

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-date', new Date().getTime())
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const startRegister = async({email, password, nombre})=>{
        dispatch( onChecking())
        

        try {
            
            const {data} = await calendarApi.post('/auth/new', {email, password, nombre})
        

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-date', new Date().getTime())
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''))
            setTimeout(()=>{
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async ()=>{
        const token= localStorage.getItem('token')
        if(!token) return dispatch( onLogout())

        try {
            const {data} = calendarApi.get('auth/renew')
            localStorage.setitem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({nombre: data.nombre, uid: data.uid}))

        } catch (error) {
            localStorage.clear()
            dispatch(onLogout())
        }
    }

    const startLogout = ()=>{
        localStorage.clear()
        dispatch(onLogout())
    }
   
    return{

        errorMessage,
        status, 
        user,
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout

    }
}

