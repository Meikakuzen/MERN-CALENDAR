import React from 'react'
import useCalendarStore from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'
import { addHours } from 'date-fns'

const FabDelete= () => {

  const  {startDeleteEvent, hasEventSelected} = useCalendarStore()


    const handleDelete=()=>{
      startDeleteEvent()
     
    }

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDelete}
    style={{
      display: hasEventSelected ? '': 'none'
    }}>ELIMINAR</button>
  )
}

export default FabDelete