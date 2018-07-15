import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import { Page, FlexHeading, FlexItem, FlexSection, Button, Heading, Skip } from './style';

const PROPERTIES_QUERY = gql`{ properties { id title location owner { name } } }`;

const Property = FlexSection.extend`
`;

const PropertiesList = ({ properties }) => (
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
      let pageContent;
      if (loading) { pageContent = <p>Loading...</p>; } else
      if (error) { pageContent = <p>Error :(</p>; } else {
        pageContent = (
          <div>
            <FlexHeading>
              <FlexItem><Heading>Property</Heading></FlexItem>
              <FlexItem><Heading>Location</Heading></FlexItem>
              <FlexItem><Heading>Owner</Heading></FlexItem>
              <FlexItem><Heading>Actions</Heading></FlexItem>
            </FlexHeading>
            <PropertiesList properties={data.properties} />
          </div>
        );
      }

      return (
        <Page>
          {pageContent}
          <Skip />
          <NavLink to="/about"><Button>ADD PROPERTY</Button></NavLink>
        </Page>
      );
    }}
  </Query>
);

export default Component;
export { PropertiesList, PROPERTIES_QUERY };
