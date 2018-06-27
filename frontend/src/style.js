import styled from 'styled-components';

const theme = {
  primary: '#ef476b',
  secondary: '#22216d',
  textMain: '#8492a6',
  textAlt: '#fff',
};

const FlexSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 8px;
  height: 40px;
  line-height: 40px;
`;

const FlexHeading = FlexSection.extend`
  font-weight: bold;
`;

const FlexItem = styled.div`
  flex: 1 1 0;
  text-align: center;
`;

const Button = styled.button`
  display: inline-block;
  width: auto;
  padding: 0px 30px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: ${theme.primary};
  color: ${theme.textAlt};
  border-radius: 20px;
  border: none;
  margin: 0 auto;
  vertical-align: top;
  &:hover {
    background: ${theme.secondary};
  }
`;

const Title = styled.h1``;
const SectionTitle = styled.h2``;
const Heading = styled.h3`
  margin: 0;
  color: ${theme.secondary}
`;

const Link = styled.p`
  color: ${theme.text};
  text-decoration: none;
  text-decoration-style: unset !important;

  &:hover {
    color: ${theme.secondary};
    background:red;
    text-decoration: none !important;
    text-decoration-style: unset !important;
  }
  &:link {
    color: ${theme.secondary};
    text-decoration: none;
  }
  &:visited {
    color: ${theme.text};
    text-decoration: none;
  }
`;

export { Button, FlexHeading, FlexItem, FlexSection, Title, SectionTitle, Heading, Link };
export default theme;
