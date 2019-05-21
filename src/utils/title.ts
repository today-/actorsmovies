import React from 'react';
import {I18nKey} from '~/i18n';
import {useTranslation} from 'react-i18next';

export function useDocumentTitle(title: string = '') {
  React.useLayoutEffect(() => {
    document.title = `ActorsMovies${title && ` - ${title}`}`;
  }, [title]);
}

export function useI18nTitle(title: I18nKey | '' = '') {
  const {t} = useTranslation();
  useDocumentTitle(t(title));
}
