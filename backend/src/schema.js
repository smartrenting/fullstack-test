import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query { 
    properties: [Property] 
    property(id: ID!): Property
    clients: [Client]
  }

  type Mutation {
    addClient(name: String!): Client
    addProperty(title: String!, location: String!, owner: ClientAttribute!): Property
  }

  type Property { title: String, location: String, owner: Client, id: ID! }

  type Client { name: String, id: ID!, properties: [Property] }
  input ClientAttribute {
    id: ID
    name: String
  }
`;

export default typeDefs;
