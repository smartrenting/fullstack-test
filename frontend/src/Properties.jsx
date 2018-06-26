import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { FlexHeading, FlexItem, FlexSection } from './style';

export const PROPERTIES_QUERY = gql`{ properties { title location owner { name } } }`;

const Property = FlexSection.extend`
`;

const Properties = ({ properties }) => (
  properties.map(({ title, location, owner }) => (
    <Property key={title}>
      <FlexItem>{title}</FlexItem>
      <FlexItem>{location}</FlexItem>
      <FlexItem>{owner.name}</FlexItem>
      <FlexItem />
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
            <FlexItem>Property name</FlexItem>
            <FlexItem>Property location</FlexItem>
            <FlexItem>Property owner</FlexItem>
            <FlexItem>Actions</FlexItem>
          </FlexHeading>
          <Properties properties={data.properties} />
        </div>
      );
    }}
  </Query>
);

export default Component;
