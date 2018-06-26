import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const PROPERTIES_QUERY = gql`{ properties { title } }`;

const Property = styled.div`
`;

const Properties = ({ properties }) => (
  properties.map(({ title }) => (
    <Property key={title}>
      <p>{title}</p>
    </Property>
  ))
);

const Component = () => (
  <Query query={PROPERTIES_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <Properties properties={data.properties} />;
    }}
  </Query>
);

export default Component;
