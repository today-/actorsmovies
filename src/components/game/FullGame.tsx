import React from 'react';
import {last} from 'lodash';
import {useStore} from 'effector-react';
import {Segment} from 'semantic-ui-react';
import {GameInfo} from './GameInfo';
import {GameItem} from './item/GameItem';
import {GameItemAdd} from './item/GameItemAdd';
import {IGameItem, IGameItemType} from '~/api/item';
import {$gameItems, $gameTitle, $isGameActive} from '~/stores/game';
import {$lastItemAddedType, addItem, removeItem} from '~/stores/items';
import {useDocumentTitle} from '~/utils/title';
import {invertKind} from '~/components/ui';

export type FullGameItemsProps = {
  id?: number;
};

export function FullGame({id}: FullGameItemsProps) {
  const gameItems = useStore($gameItems);
  const isGameActive = useStore($isGameActive);
  const lastItemAddedType = useStore($lastItemAddedType);
  const gameTitle = useStore($gameTitle);

  useDocumentTitle(gameTitle);

  if (gameItems.length === 0) {
    return null;
  }

  const itemsOfType = (type: IGameItemType) =>
    gameItems.filter(i => i.type === type);

  const renderItems = (items: IGameItem[]) =>
    items.map((item, idx) => (
      <GameItem
        key={item.id}
        gameId={id}
        onRemove={removeItem}
        isRemovable={isGameActive && (idx > 0) && ((idx + 1) === items.length)}
        {...item}
      />
    ));

  const renderForm = (type: IGameItemType) => {
    const lastItem = last(itemsOfType(type));
    return (
      <GameItemAdd
        type={type}
        gameId={id}
        kind={invertKind(lastItem.kind)}
        onUpdate={addItem}
        key={lastItem && lastItem.id}
        linkId={lastItem && lastItem.id}
        autoFocus={lastItemAddedType === type}
      />
    );
  };

  const topItems = renderItems(itemsOfType('top'));
  const bottomItems = renderItems(itemsOfType('bottom')).reverse();

  return (
    <>
      <GameInfo/>
      {isGameActive ? (
        <>
          <Segment.Group>
            {topItems}
            {renderForm('top')}
          </Segment.Group>
          <Segment.Group>
            {renderForm('bottom')}
            {bottomItems}
          </Segment.Group>
        </>
      ) : (
        <Segment.Group>
          {topItems}
          {bottomItems}
        </Segment.Group>
      )}
    </>
  );
}
