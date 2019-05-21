import React from 'react';
import styled from 'styled-components';
import {Icon} from 'semantic-ui-react';
import {i18n} from '~/i18n';

export const ErrorBlock: React.FC = ({children}) => {
  const isWrongError = typeof children === 'object' || typeof children === 'function';

  if (isWrongError) {
    console.warn(children);
  }

  return (
    <ErrorBlockContainer>
      <Icon name={'warning sign'}/>
      {isWrongError ? i18n.t('service-unavailable') : children}
    </ErrorBlockContainer>
  );
};

const ErrorBlockContainer = styled.div`
  display: inline-block;
  color: red;
`;
