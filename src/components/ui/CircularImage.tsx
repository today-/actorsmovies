import React from 'react';
import styled, {css} from 'styled-components';
import {Image, ImageProps} from 'semantic-ui-react';

type CircularImageProps = ImageProps & {
  src: string;
  px?: number;
};

export const CircularImage: React.FC<CircularImageProps> = ({src, px = 40, ...rest}) => (
  <ItemImage
    pic={src}
    px={px}
    spaced={'right'}
    circular
    rounded
    wrapped
    {...rest}
  />
);

type StyledImageProps = {px: number, pic: string};

const ItemImage = styled(Image)`
  background: url(https://www.gravatar.com/avatar/1?s=100&d=mm);
  background-size: cover;

  ${(props: StyledImageProps) => css`
    max-height: ${props.px}px !important;
    max-width: ${props.px}px !important;

    img {
      width: ${props.px}px !important;
      height: ${props.px}px !important;
      background-image: url("${props.pic}");
      background-size: cover;
      background-position-y: 40%;
    }
  `}
`;
