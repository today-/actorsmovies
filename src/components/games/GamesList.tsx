import React, {useLayoutEffect} from 'react';
import {useStore} from 'effector-react';
import {NewGameButton} from './NewGameButton';
import {ShortGame} from './short-game/ShortGame';
import {$games, getGames} from '~/stores/games';
import {Conditional} from '../common';
import {NoGames} from './NoGames';
import {i18n} from '~/i18n';

export function GamesList() {
  const {result = [], loading, error} = useStore($games);

  useLayoutEffect(() => {
    getGames();
  }, [i18n.language]);

  return (
    <>
      <NewGameButton/>
      <Conditional
        error={error}
        loading={loading}
        children={(result && result.length > 0) ?
          result.map(game => (
            <ShortGame
              key={game.id}
              {...game}
            />
          )) : <NoGames/>
        }
      />
    </>
  );
}
