import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [time, setTime] = useState("");

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
  };
  const onChangeTime = (e) => {
    let time = new Date(e.target.value);
    let string = time.getHours() + ":" + time.getMinutes();
    setTime(string);
    console.log(string);
  };

  const onChangeEvent = (e) => {
    setEventName(e.target.value);
    console.log(e.target.value);
  };

  const addEvent = (event) => {
    setEvents([...events, event]);
    console.log(events);
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      return (
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
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
        <Calendar onChange={onChange} value={date} tileContent={tileContent} />
      </div>
      <div className="events-container">
        <h2>Events for {date.toDateString()}</h2>
        <ul>
          {getEventsForDate(date).map((event, index) => (
            <li key={index}>
              {event.time} - {event.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-event-form">
        <h2>Add Event</h2>
        <input type="text" placeholder="Event Name" onChange={onChangeEvent} />
        <input type="datetime-local" onChange={onChangeTime} />
        <button
          onClick={() => addEvent({ date: date, name: eventName, time: time })}
        >
          Add Event
        </button>
      </div>
    </div>
  );
}

export default MyCalendar;
