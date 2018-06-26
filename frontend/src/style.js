import styled from 'styled-components';

const FlexSection = styled.section`
  display: flex;
  justify-content: center;
`;

const FlexHeading = FlexSection.extend`
  font-weight: bold;
`;

const FlexItem = styled.div`
  flex: 1 1 0;
  text-align: center;
`;

export { FlexHeading, FlexItem, FlexSection };
