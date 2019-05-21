import {debounce} from 'lodash';
import {createEvent} from 'effector';
import {fetchSearch} from '~/api/search';
import {createServiceEffect, createServiceStore} from '~/stores';

export const createSearch = () => {
  const getSearch = createServiceEffect(fetchSearch, 'Fetch search results');

  const getDebouncedSearch = debounce(getSearch, 200);

  const resetSearch = createEvent<any>('Clear search suggestions');

  const $search = createServiceStore(getSearch)
    .reset(resetSearch);

  return {stores: {$search}, events: {getSearch, getDebouncedSearch, resetSearch}};
};
