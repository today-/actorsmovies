import React from 'react';
import styled, {css} from 'styled-components';
import {Label, Responsive} from 'semantic-ui-react';
import {CircularImage} from '~/components/ui';
import {IGameItem} from '~/api/item';

type PointingProps = {
  pointing: 'left' | 'right';
};

type ShortGameProps = IGameItem & PointingProps;

export function ShortGameItem(props: ShortGameProps) {
  const {pic, name, pointing} = props;

  return (
    <ItemLabel pointing={pointing}>
      {pointing === 'left' && name}
      <Responsive
        minWidth={400}
        as={CircularImage}
        src={pic}
        spaced={pointing}
      />
      {pointing !== 'left' && name}
    </ItemLabel>
  );
}

const ItemLabel = styled(Label)`
  flex: 1;
  min-height: 50px;

  ${(props: PointingProps) => (props.pointing === 'left') && css`
    justify-content: flex-end;
    text-align: right;
  `};

  &.ui.label {
    display: flex;
    align-items: center;
  }
`;
