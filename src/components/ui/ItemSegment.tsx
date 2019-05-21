import React from 'react';
import styled from 'styled-components';
import {FullWidthSegment} from '~/components/ui/FullWidthSegment';
import {IGameItemKind} from '~/api/item';

type ItemSegmentProps = {
  kind: IGameItemKind;
};

export const invertKind = (kind: IGameItemKind) => kind === 'movie' ? 'actor' : 'movie';

export const getColor = ({ kind }: ItemSegmentProps) => kind === 'movie' ? '#a333c866' : '#21ba4566';

export const ItemSegment = styled(FullWidthSegment)`
  display: flex;
  border-left: 2px solid ${getColor}!important;
`;
