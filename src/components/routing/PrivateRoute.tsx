import React from 'react';
import {Redirect} from 'react-router';
import {useStore} from 'effector-react';
import {CommonRoute, CommonRouteProps} from './CommonRoute';
import {$user} from '~/stores/user';

export function PrivateRoute(props: CommonRouteProps) {
  const {result} = useStore($user);

  if (result) {
    return (
      <CommonRoute {...props} />
    );
  }

  return (
    <Redirect to={'/login'}/>
  );
}
