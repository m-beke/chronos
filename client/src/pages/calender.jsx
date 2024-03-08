import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
function MyCalendar() {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const onChange = (selectedDate) => {
    setEventDate(selectedDate);
    console.log(selectedDate);
  };
  const onChangeTime = (e) => {
    let time = new Date(e.target.value);
    let string = time.getHours() + ":" + time.getMinutes();
    setEventTime(string);
    console.log(string);
  };
  const onChangeEvent = (e) => {
    setEventTitle(e.target.value);
    console.log(e.target.value);
  };
  const addEvent = () => {
    const newEvent = { eventDate, eventTitle, eventTime };
    setEvents([...events, newEvent]);
    console.log(events);
  };
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      return (
        event.eventDate.getFullYear() === date.getFullYear() &&
        event.eventDate.getMonth() === date.getMonth() &&
        event.eventDate.getDate() === date.getDate()
      );
    });
  };
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventsForDate = getEventsForDate(date);
      return eventsForDate.length > 0 ? (
        <p>{eventsForDate.length} event(s)</p>
      ) : null;
    }
  };
  return (
    <div className="myCalendar">
      <h1 className="text-center">My Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={onChange} value={eventDate} tileContent={tileContent} />
      </div>
      <div className="events-container">
        <h2>Events for {eventDate.toDateString()}</h2>
        <ul>
          {getEventsForDate(eventDate).map((event, index) => (
            <li key={index}>
              {event.eventTime} - {event.eventTitle}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-event-form">
        <h2>Add Event</h2>
        <input type="text" placeholder="Event Name" onChange={onChangeEvent} />
        <input type="datetime-local" onChange={onChangeTime} />
        <button onClick={addEvent}>Add Event</button>
      </div>
    </div>
  );
}

export default MyCalendar;


