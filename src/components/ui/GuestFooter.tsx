import React from 'react';
import styled from 'styled-components';
import {toggleLanguage} from '~/i18n';
import {MultiFlag} from './';

export const GuestFooter: React.FC = ({children}) => (
  <GuestFooterContainer>
    <div/>
    <div>
      {children}
    </div>
    <LangToggler onClick={toggleLanguage}>
      <MultiFlag/>
    </LangToggler>
  </GuestFooterContainer>
);

const GuestFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const LangToggler = styled.div`
  cursor: pointer;
`;
