import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($eventTitle: String!, $eventDate: String!, $eventTime: String!) {
    addEvent(eventTitle: $eventTitle, eventDate: $eventDate, eventTime: $eventTime) {
      _id
      eventTitle
      eventDate
      eventTime
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!) {
    updateUser(username: $username, email: $email) {
      _id
      username
      email
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: ID!, $eventTitle: String, $eventDate: String, $eventTime: String) {
    updateEvent(eventId: $eventId, eventTitle: $eventTitle, eventDate: $eventDate, eventTime: $eventTime) {
      _id
      eventTitle
      eventDate
      eventTime
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;