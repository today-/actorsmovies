import React, {useLayoutEffect} from 'react';
import {RouteComponentProps} from 'react-router';
import {useStore} from 'effector-react';

import {$game, getGame} from '~/stores/game';
import {Conditional} from '../common';
import {FullGame} from './FullGame';
import {i18n} from '~/i18n';

export type FullGamePageProps = RouteComponentProps<{
  id?: string;
}>;

export function FullGamePage({match: {params}}: FullGamePageProps) {
  const {error, loading} = useStore($game);

  const id = Number(params.id);

  useLayoutEffect(() => {
    getGame(id);
  }, [i18n.language]);

  return (
    <Conditional
      error={error}
      loading={loading}
      children={<FullGame id={id}/>}
    />
  );
}
