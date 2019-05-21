import React from 'react';
import styled from 'styled-components';
import {Icon, Label} from 'semantic-ui-react';
import {useStore} from 'effector-react';
import {toHuman} from '~/utils/date';
import {$game} from '~/stores/game';
import {t} from '~/i18n';

export function GameInfo() {
  const {result: {started_at, finished_at}} = useStore($game);

  return (
    <GameInfoContainer>
      <Label basic>
        <Icon name={'file alternate outline'}/>
        {t('started-at')} {toHuman(started_at)}
      </Label>
      {finished_at && (
        <Label basic>
          <Icon name={'flag checkered'}/>
          {t('finished-at')} {toHuman(finished_at)}
        </Label>
      )}
    </GameInfoContainer>
  );
}

const GameInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
