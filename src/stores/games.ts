import {createServiceEffect, createServiceStore} from '~/stores';
import {fetchGames} from '~/api/games';

export const getGames = createServiceEffect(fetchGames, 'Fetch all games');

export const $games = createServiceStore(getGames, []);

export const $isNewGameAvailable = $games.map(({loading, result}) => Boolean(!loading && result.length < 32));
