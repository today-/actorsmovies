import React from 'react';
import {Icon, Label, Responsive} from 'semantic-ui-react';
import styled from 'styled-components';

type ShortGameDividerProps = {
  isActive: boolean;
  moreItems: number;
};

export function ShortGameDivider({isActive, moreItems}: ShortGameDividerProps) {
  const color = isActive ? 'green' : null;
  const icon = isActive ? 'play' : 'ellipsis horizontal';

  return (
    <>
      <Responsive maxWidth={600}>
        <Label color={color} basic={!isActive} circular>
          <Icon name={icon} fitted/>
        </Label>
      </Responsive>

      <Responsive minWidth={600}>
        <DividerContainer>
          <DividerLabel color={color} basic={!isActive} circular>
            <Icon name={icon} fitted={moreItems === 0}/> {moreItems > 0 ? moreItems : ''}
          </DividerLabel>
        </DividerContainer>
      </Responsive>
    </>
  );
}

const DividerContainer = styled.div`
  width: 60px;
`;

const DividerLabel = styled(Label)`
  width: 100%;
  text-align: center;
`;
