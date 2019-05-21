import React from 'react';
import styled from 'styled-components';
import {Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {H3} from './';

interface GuestHeaderProps {
  text: React.ReactNode;
}

export const GuestHeader = ({text}: GuestHeaderProps) => (
  <GuestHeaderContainer>
    <H3>{text}</H3>
    <NavLink to={'/faq'}>
      <Image src="/logo.png" size="small"/>
    </NavLink>
  </GuestHeaderContainer>
);

const GuestHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
