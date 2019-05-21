import React from 'react';
import {WithTranslation, withTranslation} from 'react-i18next';
import {inject, Injected} from 'effector-react-inject';
import {GuestLayout} from '../layout/GuestLayout';
import {UserLayout} from '../layout/UserLayout';
import {$error, setError} from '~/stores/error';
import {ErrorPage} from '../common';
import {$user} from '~/stores/user';

import './app.scss';

const stores = {$error, $user};

export type AppProps = Injected<typeof stores> & WithTranslation;

@inject(stores)
class AppComponent extends React.Component<AppProps> {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn(error, errorInfo);
    setError(error.message);
  }

  render() {
    const {$user} = this.props;

    return $user.result ? (
      <UserLayout children={this.renderPage()} />
    ) : (
      <GuestLayout children={this.renderPage()} />
    );
  }

  private renderPage() {
    const {$error, children} = this.props;

    return $error ? this.renderErrorPage() : children;
  }

  private renderErrorPage() {
    return (
      <ErrorPage title={this.props.$error}/>
    );
  }
}

export const App = withTranslation()(AppComponent);
