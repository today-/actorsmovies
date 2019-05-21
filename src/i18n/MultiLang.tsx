import React from 'react';
import {i18n} from '~/i18n';

type MultiLangProps = {
  en: JSX.Element;
  ru: JSX.Element;
};

export function MultiLang(props: MultiLangProps): JSX.Element {
  switch (i18n.language) {
    case 'ru':
      return props.ru;
    case 'en':
      return props.en;
    default:
      return null;
  }
}
