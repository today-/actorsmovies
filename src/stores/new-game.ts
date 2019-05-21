import {fetchNewGame} from '~/api/games';
import {createServiceEffect, createServiceStore} from '~/stores';
import {history} from '~/';

export const postNewGame = createServiceEffect(fetchNewGame, 'Create new game');

postNewGame.done.watch(({result}) => {
  if (result && result.id) {
    history.push(`/game/${result.id}`);
  }
});

export const $newGame = createServiceStore(postNewGame);
