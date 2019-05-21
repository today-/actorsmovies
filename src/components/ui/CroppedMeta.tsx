import styled from 'styled-components';
import {Card} from 'semantic-ui-react';

export const CroppedMeta = styled(Card.Meta)`
  max-height: 67px;
  overflow: hidden;
  position: relative;
  font-size: 1em;
  color: rgba(0,0,0,.4);

  &:before {
    content: "";
    position: absolute;
    top: 47px;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    z-index: 4;
    background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
  }
`;
