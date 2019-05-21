import {createBrowserHistory} from 'history';
import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router} from 'react-router';

import {initStores} from './init-stores';
import {probeUser} from '~/stores/user';
import {routes} from '~/routes';

import './i18n';

export const history = createBrowserHistory();

initStores();

const AppContent: React.FC = hot(() => (
  <Router history={history}>{routes}</Router>
));

probeUser().then(() => {
  if (process.env.NODE_ENV === 'development') {
    const {AppContainer} = require('react-hot-loader');
    const {whyDidYouUpdate} = require('why-did-you-update');

    whyDidYouUpdate(React);

    ReactDOM.render(
      <AppContainer><AppContent/></AppContainer>,
      document.getElementById('root'),
    );

    if ((module as any).hot) {
      (module as any).hot.accept();
    }
  } else {
    ReactDOM.render(
      <AppContent/>,
      document.getElementById('root'),
    );
  }
});
