import {createEffect} from 'effector';
import {getUser, updateUser} from '~/stores/user';
import {fetchLogin, fetchLogout, ILoginRequest} from '~/api/user';
import {createServiceEffect} from '~/stores';

export const postLogin = createEffect<ILoginRequest, void, string>('Login')
  .use(async (data) => {
    await fetchLogin(data);

    await getUser();
  });

export const postLogout = createServiceEffect(fetchLogout, 'Logout');

postLogout.watch(() => updateUser(null));
