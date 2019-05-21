import React from 'react';
import {Button, Header} from 'semantic-ui-react';
import {clearError} from '~/stores/error';
import {t} from '~/i18n';

type ErrorPageProps = {
  title?: React.ReactNode;
  text?: React.ReactNode;
};

export const ErrorPage: React.FC<ErrorPageProps> = ({text, title}) => (
  <>
    <Header as="h2" textAlign="center">
      {title}
      <Header.Subheader>
        {text}
      </Header.Subheader>
      <Button onClick={clearError}>
        {t('retry-button')}
      </Button>
    </Header>
  </>
);
