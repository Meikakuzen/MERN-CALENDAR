import { useState } from 'react'
import Navbar from '../components/Navbar'
import { Calendar} from 'react-big-calendar' 
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer } from '../../helpers/CalendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'
import CalendarEventBox from '../components/CalendarEventBox'
import CalendarModal from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import useCalendarStore from '../../hooks/useCalendarStore'
import FabAddNew from '../components/FabAddNew'
import FabDelete from '../components/FabDelete'







const CalendarPage = () => {

    const {events, setActiveEvent} = useCalendarStore()

    const {openDateModal}= useUiStore()

    const [lastView, setLastView]= useState(localStorage.getItem('lastView') || 'week')



    const eventStyleGetter = (event, start, end, isSelected)=>{
    

        const style={
            backgroundColor: '#347CF7',
            borderRadius: '0px'
        }
        return {style}
    }

    const onDoubleCLick = (event)=>{
        //console.log({doubleClick: event})
        openDateModal()
    }
    
    const onSelect = (event)=>{
        //console.log({click: event})
        setActiveEvent(event)
    }

    const onViewChanged = (event)=>{
        localStorage.setItem('lastView', event)

        setLastView(event)
    }


  return (
    <>
    <Navbar />

    <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500}}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
            event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleCLick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
    />
    <CalendarModal />
    <FabAddNew />
    <FabDelete />
    </>
  )
}

export default CalendarPage