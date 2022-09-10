import React from 'react'

const CalendarEventBox = ({event}) => {
  
    const {title, user}= event
  
    return (
    <>
        <p>{title}</p>
        <span>{user.name}</span>
    </>
  )
}

export default CalendarEventBox