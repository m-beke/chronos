import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
import { ADD_EVENT, REMOVE_EVENTS_FOR_DATE, DELETE_EVENT } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

function MyCalendar() {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  useEffect(() => {
    if (user) {
      setEvents(user.events);
    }
  }, [user]);

  const [addEvent, { error }] = useMutation(ADD_EVENT);
  // const [removeEventsForDateMutation] = useMutation(REMOVE_EVENTS_FOR_DATE);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const onChange = (selectedDate) => {
    setEventDate(selectedDate);
  };

  const onChangeTime = (e) => {
    setEventTime(e.target.value);
  };

  const onChangeEvent = (e) => {
    setEventTitle(e.target.value);
  };

  const addNewEvent = async () => {
    try {
      const newEvent = { eventDate, eventTitle, eventTime };
      const { data } = await addEvent({
        variables: { ...newEvent },
      });
      setEventTitle("");
      setEventTime("");
      if (data.addEvent) {
        setEvents([...events, data.addEvent]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOldEvent = async (index) => {

    try {
      const eventId = events[index]._id;
      console.log(eventId, "this is eventID")
      await deleteEvent({ variables: { eventId: eventId } });
      setEvents((prevEvents) => {
        return prevEvents.filter((event, i) => i !== index);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const removeEventsForDate = async (date) => {
  //   try {
  //     await removeEventsForDateMutation({ variables: { date } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getEventsForDate = (date) => {
    
    return events?.filter((event) => {
      const eventDate = new Date(event.eventDate);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    }) || [];
  };

  const tileContent = ({ date, view }) => {
    events.map((event) => {
      // console.log (`event date is ${event.eventDate.getDate()} and the date is ${date.getDate()}`)
       if (event.eventDate === date){        
          return event.eventTitle      
      }
    });
    //   const eventsForDate = getEventsForDate(date);
    //   return eventsForDate.length > 0 ? (
    //     <p>{eventsForDate.length} event(s)</p>
    //   ) : null;
    // }
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
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <li key={index}>
                
                {event.eventTime} - {event.eventTitle} - {event.eventDate}
                <button onClick={() => deleteOldEvent(index)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No events found</li>
          )
          }
        </ul>
      </div>
      <div className="add-event-form">
        <h2>Add Event</h2>
        <input type="text" placeholder="Event Name" value={eventTitle} onChange={onChangeEvent} />
        <input type="time" value={eventTime} onChange={onChangeTime} />
        <button onClick={addNewEvent}>Add Event</button>
      </div>
    </div>
  );
};

export default MyCalendar;
