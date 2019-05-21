import React from 'react';
import {useStore} from 'effector-react';
import {Icon, Button} from 'semantic-ui-react';
import {$newGame, postNewGame} from '~/stores/new-game';
import {$isNewGameAvailable} from '~/stores/games';
import {t} from '~/i18n';

export function NewGameButton() {
  const {loading, error} = useStore($newGame);
  const isNewGameAvailable = useStore($isNewGameAvailable);

  const handleNewGame = () => postNewGame({});

  return (
    <Button
      onClick={handleNewGame}
      disabled={!isNewGameAvailable}
      loading={loading}
      labelPosition="right"
      icon
    >
      {t('new-game')}
      {error
        ? <Icon name="warning circle" color={'red'} />
        : <Icon name="arrow right" />
      }
    </Button>
  );
}
