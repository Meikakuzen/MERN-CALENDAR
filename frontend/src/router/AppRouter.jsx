import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../auth/pages/Login'
import Calendar from '../calendar/pages/Calendar'


const AppRouter = () => {

const authStatus = "authenticated"


  return (
    <Routes>
        {
            (authStatus === "not-authenticated")
            ? <Route path="auth/*" element={<Login />} />
            : <Route  path="/*" element={<Calendar />}  />
            

        }

            <Route path='/*' element={<Navigate to="/auth/login" />} />

    </Routes>
  )
}

export default AppRouter