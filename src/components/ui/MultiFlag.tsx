import React from 'react';
import {Flag} from 'semantic-ui-react';
import {MultiLang} from '~/i18n/MultiLang';

export const MultiFlag = () => (
  <MultiLang
    en={<Flag name={'ru'}/>}
    ru={<Flag name={'gb'}/>}
  />
);
