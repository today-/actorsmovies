import React from 'react';
import styled from 'styled-components';
import {Header} from 'semantic-ui-react';

export const H3: React.FC = ({children}) => (
  <H3Header as="h3">
    {children}
  </H3Header>
);

const H3Header = styled(Header)`
  font-weight: 300;
  margin: 0 !important;
`;
