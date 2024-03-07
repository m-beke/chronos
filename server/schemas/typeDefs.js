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
    title: String
    date: String
    createdAt: String
   
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
    addEvent(eventText: String!): Event
    removeEvent(eventId: ID!): Event
  
  }
`;

module.exports = typeDefs;
