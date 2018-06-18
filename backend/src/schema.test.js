import { mockServer } from 'graphql-tools';
import typeDefs from './schema';

const MockServer = mockServer(typeDefs);

describe('Schema', () => {
  it('should have valid type definitions', async () => {
    expect(async () => {
      await MockServer.query('{ __schema { types { name } } }');
    }).not.toThrow();
  });
});


describe('Properties', () => {
  it('should return the property list', async () => {
    const results = await MockServer.query('{properties { title }}');
    expect(results.data.properties.length).toBe(2);
  });

  it('should return the property owner name', async () => {
    const results = await MockServer.query('{property(id:1) { title owner { name }}}');
    expect(results.data.property.owner.name).toBe('Hello World');
  });
});
