import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
import { ADD_EVENT } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_EVENTS } from "../utils/queries";

function MyCalendar() {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  // setEvents(user.events);
  // useEffect(() => {
  //   if (user) {
  //     setEvents(user.events);
  //     console.log(user.events);
  //   }
  // }, []);
  console.log(user);
  const [addEvents, { error }] = useMutation(ADD_EVENT, {
    refetchQueries: [QUERY_EVENTS, "getEvents"],
  });

  const onChange = (selectedDate) => {
    setEventDate(selectedDate);
    console.log(selectedDate);
  };

  const onChangeTime = (e) => {
    setEventTime(e.target.value);
    console.log(e.target.value);
  };

  const onChangeEvent = (e) => {
    setEventTitle(e.target.value);
    console.log(e.target.value);
  };

  const addEvent = async () => {
    try {
      const newEvent = { eventDate, eventTitle, eventTime };
      const { data } = await addEvents({
        variables: { ...newEvent },
      });
      console.log(data.addEvent);
      setEvents([...events, newEvent]);
      console.log(events);
      // Clear input fields after adding the event
      setEventTitle("");
      setEventTime("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
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
        <Calendar
          onChange={onChange}
          value={eventDate}
          tileContent={tileContent}
        />
      </div>
      <div className="events-container">
        <h2>Events for {eventDate.toDateString()}</h2>
        <ul>
          {getEventsForDate(eventDate).map((event, index) => (
            <li key={index}>
              {event.eventTime} - {event.eventTitle}
              <button onClick={() => deleteEvent(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="add-event-form">
        <h2>Add Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={eventTitle}
          onChange={onChangeEvent}
        />
        <input type="time" value={eventTime} onChange={onChangeTime} />
        <button onClick={addEvent}>Add Event</button>
      </div>
    </div>
  );
}

export default MyCalendar;
