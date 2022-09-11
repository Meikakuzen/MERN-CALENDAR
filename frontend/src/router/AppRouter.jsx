import { useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/pages/Login'
import Calendar from '../calendar/pages/Calendar'
import { useAuthStore } from '../hooks/useAuthStore'

const AppRouter = () => {


  const { status, checkAuthToken} = useAuthStore()

  useEffect(()=>{
    checkAuthToken()
  },[])

  
  
  if(status === "checking"){
    return <h1> Cargando ...</h1>
  }


  return (
    <Routes>
        {
            (status === "not-authenticated")

            ?(
              <>
                  <Route path="auth/*" element={<Login />} />
                  <Route  path="/*" element={<Navigate to="auth/login" />}  />
              
              </>

            )
            
            : (
              <>
                <Route  path="/" element={<Calendar />}  />
                <Route path='/*' element={<Navigate to="/" />} />
              
              </>
              
              )
              

        }


    </Routes>
  )
}

export default AppRouter