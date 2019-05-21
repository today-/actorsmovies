import {request} from './';

export type ITopUser = {
  finished_count: number;
  name: string;
  photo_url: string;
};

export type IStatCategory = {
  finished: number;
  finished_percent: number;
  games: number;
  items: number;
  users?: number;
};

export type IStats = {
  total: IStatCategory;
  user: IStatCategory;
  top: ITopUser[];
};

export function fetchStats() {
  return request<IStats>({
    method: 'get',
    url: `/stats`,
  });
}
