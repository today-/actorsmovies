import {request} from './';

export type IGameItemType = 'top' | 'bottom';

export type IGameItemKind = 'actor' | 'movie';

export type IGameItem = {
  id: number,
  name: string,
  type: IGameItemType;
  kind: IGameItemKind,
  pic: string;
  desc: string;
  url: string;
};

type IItemRequest = {
  gameId: number;
  type: IGameItemType;
};

export type IAddItemRequest = IItemRequest & {
  id: number;
};

export type IItemResponse = {
  finished: boolean;
  item?: IGameItem;
};

export type IRemoveItemRequest = IItemRequest;

export function fetchAddItem({id, type, gameId}: IAddItemRequest) {
  return request<IItemResponse>({
    method: 'post',
    url: `/games/${gameId}/items`,
    data: {id, type}
  });
}

export function fetchRemoveItem({type, gameId}: IRemoveItemRequest) {
  return request<IItemResponse>({
    method: 'delete',
    url: `/games/${gameId}/items`,
    data: {type}
  });
}
