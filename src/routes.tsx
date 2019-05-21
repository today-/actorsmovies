import React from 'react';
import {Switch} from 'react-router';

import {CommonRoute as Route} from '~/components/routing/CommonRoute';
import {PrivateRoute} from '~/components/routing/PrivateRoute';
import {GuestRoute} from '~/components/routing/GuestRoute';
import {Info404} from '~/components/common';
import {Login} from '~/components/guest/Login';
import {Register} from '~/components/guest/Register';
import {FullGamePage} from '~/components/game/FullGamePage';
import {GamesList} from '~/components/games/GamesList';
import {Profile} from '~/components/profile/Profile';
import {Stats} from '~/components/stats/Stats';
import {Faq} from '~/components/guest/Faq';

export const routes = (
  <Switch>
    <GuestRoute path="/login" component={Login} title={'login-page'}/>
    <GuestRoute path="/register" component={Register} title={'register-page'}/>

    <PrivateRoute path="/" exact component={GamesList} title={'games-page'}/>
    <PrivateRoute path="/game/:id" component={FullGamePage} />
    <PrivateRoute path="/profile" component={Profile} title={'profile-page'}/>
    <PrivateRoute path="/stats" component={Stats} title={'stats-page'}/>

    <Route path="/faq" component={Faq} title={'faq-page'}/>
    <Route component={Info404} title={'404-page'}/>
  </Switch>
);
