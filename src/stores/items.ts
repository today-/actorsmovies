import produce from 'immer';
import {createStore} from 'effector';
import {findLast, remove} from 'lodash';
import {$game, gameFinished} from '~/stores/game';
import {fetchAddItem, fetchRemoveItem, IGameItemType, IItemResponse} from '~/api/item';
import {createServiceEffect} from '~/stores';

export const addItem = createServiceEffect(fetchAddItem, 'Add item to game');

$game.on(addItem.done, (state, payload) =>
  produce(state, draft => {
    const {params: {type}, result: {item}} = payload;

    draft.result.items.push({type, ...item});
  })
);

export const removeItem = createServiceEffect(fetchRemoveItem, 'Remove item from game');

$game.on(removeItem.done, (state, {params}) =>
  produce(state, draft => {
    const lastItem = findLast(draft.result.items,
      item => item.type === params.type
    );
    remove(draft.result.items, item => item === lastItem);
  })
);

const checkGameFinished = ({result: {finished}}: {result: IItemResponse}) => {
  if (finished) {
    gameFinished();
  }
};

addItem.done.watch(checkGameFinished);
removeItem.done.watch(checkGameFinished);

export const $lastItemAddedType = createStore<IGameItemType>('top')
  .on(addItem.done, (state, {result: {item}}) => item.type)
  .on(removeItem.done, (state, {params}) => params.type);
