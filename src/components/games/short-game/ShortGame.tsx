import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {Card, Feed} from 'semantic-ui-react';
import {ShortGameDivider} from './ShortGameDivider';
import {ShortGameItem} from './ShortGameItem';
import {toHuman} from '~/utils/date';
import {IGame} from '~/api/game';
import {t} from '~/i18n';

export function ShortGame(props: IGame) {
  const {id, items, is_active, started_at, finished_at} = props;

  const [firstItem, secondItem] = items;
  const moreItems = items.length - 2;

  return (
    <Card
      as={NavLink}
      to={`/game/${id}`}
      raised={is_active}
      fluid
    >
      <Card.Content>
        <FlexFeed>
          <ShortGameItem {...firstItem} pointing={'right'}/>
          <ShortGameDivider
            isActive={is_active}
            moreItems={moreItems}
          />
          <ShortGameItem {...secondItem} pointing={'left'}/>
        </FlexFeed>
      </Card.Content>
      <Card.Content extra>
        <FlexFeed>
          <div>
            {t('started-at')} {toHuman(started_at)}
          </div>
          <div>
            {finished_at && `${t('finished-at')} ${toHuman(finished_at)}`}
          </div>
        </FlexFeed>
      </Card.Content>
    </Card>
  );
}

const FlexFeed = styled(Feed)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
