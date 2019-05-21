import React from 'react';
import styled from 'styled-components';
import {SemanticToastContainer} from 'react-semantic-toasts';
import {Container} from 'semantic-ui-react';
import {MainMenu} from './MainMenu';

import 'react-semantic-toasts/styles/react-semantic-alert.css';

export const UserLayout: React.FC = ({children}) => (
  <div>
    <MainMenu/>

    <ContentContainer>
      {children}
    </ContentContainer>

    <SemanticToastContainer position={'top-center'}/>
  </div>
);

const ContentContainer = styled(Container)`
  padding: 58px 0 16px;
`;
