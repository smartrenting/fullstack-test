import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FlexHeading, FlexItem, FlexSection, Button, Heading } from './style';

export const PROPERTIES_QUERY = gql`{ properties { id title location owner { name } } }`;

const Property = FlexSection.extend`
`;

const Properties = ({ properties }) => (
  properties.map(({ id, title, location, owner }) => (
    <Property key={id}>
      <FlexItem>{title}</FlexItem>
      <FlexItem>{location}</FlexItem>
      <FlexItem>{owner.name}</FlexItem>
      <FlexItem><Button>Test</Button></FlexItem>
    </Property>
  ))
);

const Component = () => (
  <Query query={PROPERTIES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div>
          <FlexHeading>
            <FlexItem><Heading>Property name</Heading></FlexItem>
            <FlexItem><Heading>Property location</Heading></FlexItem>
            <FlexItem><Heading>Property owner</Heading></FlexItem>
            <FlexItem><Heading>Actions</Heading></FlexItem>
          </FlexHeading>
          <Properties properties={data.properties} />
        </div>
      );
    }}
  </Query>
);

export default Component;
