import React from 'react'
import useCalendarStore from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
import { addHours } from 'date-fns'

const FabAddNew = () => {

    const { openDateModal} = useUiStore()
    
    const {setActiveEvent} = useCalendarStore()

    const handleClickNew=()=>{
        setActiveEvent({
                title: "",
                notes: "",
                start: new Date(),
                end: addHours( new Date(), 2), //súmale dos horas al evento
                bgColor: '#fafafa',
                user:{
                    _id: '12345',
                    name: "Miguel"
                }
            
        })
        openDateModal()
    }

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>EVENTO</button>
  )
}

export default FabAddNew