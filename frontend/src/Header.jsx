import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import theme from './style';

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #dce0e0;
  line-height: 3;
  padding: 5px;
`;

const LinkItem = styled.li`
  display: inline;
  margin: 5px;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${theme.secondary};
  &:hover {
    color: ${theme.primary};
  }
`;

const Links = styled.ul`
  margin: 0px;
`;

const Component = () => (
  <Header>
    <Links>
      <LinkItem>
        <Link to="/">Properties</Link>
      </LinkItem>
      <LinkItem>
        <Link to="/about">About</Link>
      </LinkItem>
    </Links>
  </Header>
);

export default Component;
