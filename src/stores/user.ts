import {createEvent} from 'effector';
import {createServiceEffect, createServiceStore} from '~/stores';
import {fetchProfile, fetchRegister, fetchUser, IUser} from '~/api/user';
import {successReducer} from '~/utils/reducers';

export const updateUser = createEvent<IUser>('Merge data to current user');

export const getUser = createServiceEffect(fetchUser, 'Fetch current user');

export const postRegister = createServiceEffect(fetchRegister, 'Register');

export const postProfile = createServiceEffect(fetchProfile, 'Update profile');

export const $user = createServiceStore(getUser)
  .on(updateUser, (state, result?: IUser) => successReducer(state, {result}))
  .on(postRegister.done, successReducer)
  .on(postProfile.done, successReducer);

export const probeUser = () => getUser().catch(() => {});
