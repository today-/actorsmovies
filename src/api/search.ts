import {requestData} from './';
import {IGameItem, IGameItemType} from '~/api/item';

export type ISearchRequest = {
  id: number;
  q: string;
  type: IGameItemType;
};

export function fetchSearch(params: ISearchRequest) {
  return requestData<IGameItem[]>({
    method: 'get',
    url: `/games/${params.id}/search`,
    params
  });
}
