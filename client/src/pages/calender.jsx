import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyCalendar.css";
import {
  ADD_EVENT,
  REMOVE_EVENTS_FOR_DATE,
  DELETE_EVENT,
} from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
 
 // This would be the main function for the calendar which manages the events and the calendar itself.
function MyCalendar() {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState("");
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};


  useEffect(() => {
    user?.events ? setEvents(user.events) : console.log("noEvents");
  }, [user]);

  const [addEvent, { error }] = useMutation(ADD_EVENT);
  // const [removeEventsForDateMutation] = useMutation(REMOVE_EVENTS_FOR_DATE);
  const [deleteEvent] = useMutation(DELETE_EVENT);

// The onchange updates the state of the date.
// The onChangeTime updates the state of the time.
// The onChangeEvent updates the state of the event.
  const onChange = (selectedDate) => {
    setEventDate(selectedDate);
  };

  const onChangeTime = (e) => {
    setEventTime(e.target.value);
  };

  const onChangeEvent = (e) => {
    setEventTitle(e.target.value);
  };

  // The addNewEvent is the function that updates the events state
  const addNewEvent = async () => {
    try {
      const newEvent = { eventDate, eventTitle, eventTime };
      const { data } = await addEvent({
        variables: { ...newEvent },
      });
      console.log(data);
      setEventTitle("");
      setEventTime("");
      data?.addEvent
        ? setEvents([...events, data.addEvent])
        : setEvents([...events]);
      if (data.addEvent) {
        console.log(events);
      }
    } catch (error) {
      console.log(error);
    }
  };
// The deleteOldEvent deletes the event
  const deleteOldEvent = async (index) => {
    try {
      const eventId = events[index]._id;
      console.log(eventId, "this is eventID");
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
// This function filters the events based on the specific date and it would return the array of the events
  const getEventsForDate = (date) => {
    return (
      events?.map((event) => {
        
        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      }) || []
    );
  };
//  The tileContent function shows the number of events in the specific date. 
  const tileContent = ({ date, view }) => {
    console.log(date, view);
    console.log(events);
    events.map((event) => {
      // const eventDate = new Date(event.eventDate.split(' at ')[0].split(',').join(''));
      console.log(eventDate.toDateString());
      console.log(new Date(date).toDateString());
      // console.log (`event date is ${event.eventDate.getDate()} and the date is ${date.getDate()}`)
      if (event.eventDate === date) {
        // return event.eventTitle;
        console.log("thisWorks");
      }
      const eventsForDate = getEventsForDate(date);
      
      
      return event.eventDate == date  ? (
        <p>{eventsForDate.length} event(s)</p>
      ) : null;
    });
  };

//  This would return the functional component which renders the calendar of the list events and the event form
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
        {/* <h2>Events for {eventDate.toDateString()}</h2> */}
        <h2>Your Upcoming Events</h2>
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
          )}
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
        <button onClick={addNewEvent}>Add Event</button>
      </div>
    </div>
  );
}

export default MyCalendar;
