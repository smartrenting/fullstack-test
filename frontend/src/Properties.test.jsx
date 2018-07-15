import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import wait from 'waait';
import Properties, { PROPERTIES_QUERY, PropertiesList } from './Properties';

const mocks = [
  {
    request: {
      query: PROPERTIES_QUERY,
    },
    result: { data: {
      properties: [
        { id: '1', title: 'Property title', location: 'Property location', owner: { name: 'Property owner' } },
        { id: '2', title: 'B', location: 'test', owner: { name: 'Jack' } }],
    } },
  },
];

it('renders without error', () => {
  TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Properties />
      </MemoryRouter>
    </MockedProvider>,
  );
});

it('initially renders a loading message', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Properties />
      </MemoryRouter>
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children[0].children).toContain('Loading...');
});

it('eventually renders the list of properties', async () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Properties />
      </MemoryRouter>
    </MockedProvider>,
  );

  await wait(0);
  const properties = component.root.findByType(PropertiesList);
  expect(properties.children.length).toBe(2);

  const firstProperty = properties.children[0].props;
  expect(firstProperty.children[0].props.children).toBe('Property title');
  expect(firstProperty.children[1].props.children).toBe('Property location');
  expect(firstProperty.children[2].props.children).toBe('Property owner');
});

it('contains a button to add a property', () => {

});
