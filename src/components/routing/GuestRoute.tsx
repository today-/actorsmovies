import React from 'react';
import {useStore} from 'effector-react';
import {Redirect} from 'react-router';
import {CommonRoute, CommonRouteProps} from './CommonRoute';
import {$user} from '~/stores/user';

export function GuestRoute(props: CommonRouteProps) {
  const {result} = useStore($user);

  if (!result) {
    return (
      <CommonRoute {...props} />
    );
  }

  return (
    <Redirect to={'/'}/>
  );
}
