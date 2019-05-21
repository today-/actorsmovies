import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';

export const AlignedIcon = styled(Icon)`
  &.icon {
    vertical-align: baseline;
  }
`;

export const AlignedLink = styled.a`
  display: inline-block;
  vertical-align: baseline;
`;
