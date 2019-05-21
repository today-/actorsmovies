import {onError, setBaseUrl} from './api';
import {updateUser} from '~/stores/user';

export function initStores() {
  const contextRoot = '';

  setBaseUrl(`${contextRoot}/api`);

  onError((error) => {
    const status = error.response && error.response.status;
    if (status === 401) {
      updateUser(null);
    }
    return Promise.reject(error);
  });
}
