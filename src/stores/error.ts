import {createEvent, createStore} from 'effector';

export const setError = createEvent<string>('Set global app error');

export const clearError = setError.prepend(() => null);

export const $error = createStore<string>(null)
  .on(setError, (state, text) => text);
