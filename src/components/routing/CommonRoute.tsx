import React from 'react';
import {Route as ReactRoute, RouteProps} from 'react-router';
import {RouteWrapper} from './RouteWrapper';
import {I18nKey} from '~/i18n';
import {useI18nTitle} from '~/utils/title';

export type CommonRouteProps = RouteProps & {
  title?: I18nKey;
};

export function CommonRoute({component, title, ...routeProps}: CommonRouteProps) {
  useI18nTitle(title);

  return (
    <ReactRoute
      render={(props) => RouteWrapper(component, props)}
      {...routeProps}
    />
  );
}
