import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import uiReducer from '../store/ui/uiSlice'
import calendarReducer from '../store/calendar/calendarSlice'
import authReducer from '../store/auth/authSlice'


export const store= configureStore({
    reducer:{
        ui:       uiReducer.reducer,
        calendar: calendarReducer.reducer,
        auth:     authReducer.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck: false //para que no revise las fechas y no de error
    })
})