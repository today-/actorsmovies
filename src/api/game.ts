import {requestData} from './';
import {IServiceState} from '~/stores';
import {IShortGame} from '~/api/games';
import {IGameItem} from '~/api/item';

export type IFullGame = {
  id: number;
  items?: IGameItem[];
  is_active?: boolean;
  started_at?: string;
  finished_at?: string;
};

export type IGame = IShortGame & Partial<IServiceState<IFullGame>>;

export function fetchGame(id: number) {
  return requestData<IFullGame>({
    method: 'get',
    url: `/games/${id}`
  });
}
