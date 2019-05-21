import React from 'react';
import {Grid} from 'semantic-ui-react';
import styled from 'styled-components';

export const GuestLayout: React.FC = ({children}) => (
  <GuestContainer>
    <FullHeightGrid textAlign="center" verticalAlign="middle">
      <FixedColumn>
        {children}
      </FixedColumn>
    </FullHeightGrid>
  </GuestContainer>
);

const GuestContainer = styled.div`
  height: 100%;
`;

const FullHeightGrid = styled(Grid)`
  height: 100%;
`;

const FixedColumn = styled(Grid.Column)`
  max-width: 450px;
`;
