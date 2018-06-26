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
    result: {
      data: {
        properties: [
          { id: '1', title: 'A', location: 'test' },
          { id: '2', title: 'B', location: 'test' }],
      },
    },
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
  expect(tree.length).toBe(2);
});
