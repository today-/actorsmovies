import React from 'react';
import styled from 'styled-components';
import {Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {FullWidthSegment, GuestFooter} from '~/components/ui';
import {t} from '~/i18n';

export const Faq: React.FC = () => (
  <>
    <FaqImage src="/logo.png"/>
    <FaqContainer basic>
      <GuestFooter/>
      <p/>
      <p><B>ActorsMovies</B>{t('faq-text-1')}</p>
      <p>{t('faq-text-2')}</p>
      <p>{t('faq-text-3')}</p>

      <p>{t('faq-text-4')}</p>
      <p>{t('faq-text-5')}</p>

      <FaqLinks>
        <NavLink to={'/register'}>
          {t('register-page')}
        </NavLink>
        <NavLink to={'/login'}>
          {t('login-page')}
        </NavLink>
      </FaqLinks>

      <FaqImage src="/faq-image.png"/>
    </FaqContainer>
  </>
);

const B = styled.span`
  font-weight: bold;
`;

const FaqContainer = styled(FullWidthSegment)`
  margin: 0 auto !important;
  max-width: 450px;
  text-align: justify;
`;

const FaqImage = styled(Image)`
  margin: 10px auto;
`;

const FaqLinks = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;
