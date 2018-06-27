import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import TestRenderer from 'react-test-renderer';
import wait from 'waait';
import Properties, { PROPERTIES_QUERY } from './Properties';

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
      <Properties />
    </MockedProvider>,
  );
});

it('initially renders a loading message', () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Properties />
    </MockedProvider>,
  );

  const tree = component.toJSON();
  expect(tree.children).toContain('Loading...');
});

it('eventually renders the list of properties', async () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Properties />
    </MockedProvider>,
  );

  await wait(0);
  const tree = component.toJSON();
  expect(tree.children.length).toBe(3);
  expect(tree.children[1].children[0].children).toContain('Property title');
  expect(tree.children[1].children[1].children).toContain('Property location');
  expect(tree.children[1].children[2].children).toContain('Property owner');
});
