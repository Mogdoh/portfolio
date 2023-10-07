import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleCalendarAction} from "../action/Actions"
import { useOutsideClick } from './OutsideClick';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import "../../css/Calendar.css"


const WindowCalendar = ()=>{

  const [date, setDate] = useState(new Date());
  const isOpen = useSelector((state) => state.isCalendarOpen)
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const toggleCalendar = () => {
    dispatch(toggleCalendarAction(true));
  }

  useOutsideClick(calendarRef, () => {
    if (isOpen) {
      dispatch(toggleCalendarAction(false));
    }
  });

  return (
    <div ref={calendarRef} className='app'>
      <div className='calendar-container'>
        {isOpen ? (
          <div className='calendar-model'>
            <Calendar onChange={setDate} value={date} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default WindowCalendar;