const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    events: [Event]!
  }

  type Event {
    _id: ID
    eventTitle: String
    eventDate: String
    eventTime: String
   
  }

  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    events(username: String): [Event]
    event(eventId: ID!): Event
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addEvent(eventTitle: String!, eventDate: String, eventTime: String): Event
    removeEvent(eventId: ID!): Event
    editEvent(eventTitle: String!, eventDate: String, eventTime: String): Event
  }
`

module.exports = typeDefs;
