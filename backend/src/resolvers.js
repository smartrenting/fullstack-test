const { BadUserInputError } = require('apollo-server');

const resolvers = {
  Query: {
    properties: (_, args, ctx) => ctx.properties,
    property: (_, { id }, ctx) =>
      ctx.properties.find(property => property.id === id),
    clients: (_, args, ctx) => ctx.clients,
  },

  Mutation: {
    addClient: (root, { name }, ctx) => {
      const newClient = { name, id: name };
      ctx.clients.push(newClient);
      return newClient;
    },
    addProperty: (root, { title, location, owner }, ctx) => {
      let client;
      if (owner.id) {
        client = ctx.clients.find(c => c.id === owner.id);
      } else if (owner.name) {
        client = resolvers.Mutation.addClient(root, owner, ctx);
      }

      if (!client) {
        throw new BadUserInputError('Missing property owner', {
          invalidArgs: 'owner',
        });
      }

      const newProperty = { title, location, owner: client.id };
      ctx.properties.push(newProperty);
      return newProperty;
    },
  },

  Property: {
    owner: (property, args, ctx) =>
      ctx.clients.find(client => client.id === property.owner),
  },

  Client: {
    properties: (client, args, ctx) =>
      ctx.properties.filter(property => property.owner === client.id),
  },
};

export default resolvers;
