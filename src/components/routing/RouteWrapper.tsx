import React from 'react';
import {App} from '../app/App';

export const RouteWrapper = (Component: React.ComponentType, props?: any) => (
  <App>
    <Component {...props} />
  </App>
);
