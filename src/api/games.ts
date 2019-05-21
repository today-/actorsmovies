import {requestData} from './';
import {IFullGame} from '~/api/game';
import {IGameItemKind} from '~/api/item';

export type IShortGame = IFullGame;

export type INewGameRequest = {
  kind?: IGameItemKind;
};

export function fetchGames() {
  return requestData<IShortGame[]>({
    method: 'get',
    url: '/games'
  });
}

export function fetchNewGame(params?: INewGameRequest) {
  return requestData<IFullGame>({
    method: 'post',
    url: '/games',
    data: params
  });
}
