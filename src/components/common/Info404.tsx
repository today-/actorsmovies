import React from 'react';
import {Header} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {FullWidthSegment} from '~/components/ui';
import {t} from '~/i18n';

export const Info404: React.FC = () => (
  <FullWidthSegment>
    <Header as="h2" textAlign="center">
      {t('404-page')}
      <Header.Subheader>
        {t('404-header')}
      </Header.Subheader>
      <NavLink to={'/'}>
        {t('goto-main')}
      </NavLink>
    </Header>
  </FullWidthSegment>
);
