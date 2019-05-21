import produce from 'immer';
import {createEvent} from 'effector';
import {toast} from 'react-semantic-toasts';
import {fetchGame} from '~/api/game';
import {createServiceEffect, createServiceStore} from '~/stores';
import {toServer} from '~/utils/date';
import {i18n} from '~/i18n';

export const getGame = createServiceEffect(fetchGame, 'Fetch game by id');

export const gameFinished = createEvent('Active game finished');

gameFinished.watch(() => {
  toast({
    type: 'success',
    title: i18n.t('congratulations'),
    description: i18n.t('game-finished')
  });
});

export const $game = createServiceStore(getGame)
  .on(gameFinished, (state) =>
    produce(state, draft => {
      draft.result.is_active = false;
      draft.result.finished_at = toServer();
    })
  );

export const $isGameActive = $game.map(({result}) => Boolean(result && result.is_active));

export const $gameItems = $game.map(({result}) => result && result.items || []);

export const $gameTitle = $gameItems.map(
  items => items.slice(0, 2).filter(i => i).map(i => i.name).join(' - ')
);
