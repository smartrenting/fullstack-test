import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolvers';

describe('Resolvers', () => {
  test('Should match the schema', async () => {
    expect(async () => makeExecutableSchema({ typeDefs, resolvers })).not.toThrow();
  });
});

const schema = makeExecutableSchema({ typeDefs, resolvers });
let context;

beforeEach(() => {
  jest.resetModules();
  context = require('./data'); // eslint-disable-line global-require
});

describe('Property', () => {
  it('Should return all properties', () => { // pure function test
    expect(resolvers.Query.properties(null, {}, context).length).toBe(2);
  });

  it('Should have an owner', async () => { // Test by executing the graphql schema
    const query = '{property(id:1) { title owner { name }}}';
    const { data: { property } } = await graphql(schema, query, {}, context);
    expect(property.owner.name).toBe('Bob');
  });

  it('should create a new property for an existing client', async () => {
    const query = 'mutation {addProperty(title:"new property", location:"new location", owner: {id:1}) { title owner { name }}}';
    const { data } = await graphql(schema, query, {}, context);
    expect(data.addProperty.owner.name).toBe('Bob');
  });

  it('needs a valid owner ID to create a new property', async () => {
    const query = 'mutation {addProperty(title:"new property", location:"new location", owner: {id:12}) { title owner { name }}}';
    const { errors } = await graphql(schema, query, {}, context);
    expect(errors[0].extensions.code).toBe('BAD_USER_INPUT');
  });

  it('should create a new property for a new client', async () => {
    const query = 'mutation {addProperty(title:"new property", location:"new location", owner: {name: "new owner"}) { title owner { name }}}';
    const { data } = await graphql(schema, query, {}, context);
    expect(data.addProperty.owner.name).toBe('new owner');
    expect(context.properties.length).toBe(3);
    expect(context.clients.length).toBe(4);
  });
});

describe('Client', () => {
  it('Should list all clients', async () => {
    const query = '{clients { name properties { title }}}';
    const { data } = await graphql(schema, query, {}, context);
    expect(data.clients.length).toBe(3);
  });

  it('Should be able to add a client', async () => {
    await graphql(
      schema,
      'mutation { addClient(name:"test") { name properties { title }} }',
      {},
      context,
    );
    const { data } = await graphql(schema, '{ clients { name } }', {}, context);
    expect(data.clients.length).toBe(4);
  });
});
