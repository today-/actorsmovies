import React from 'react';
import {Store} from 'effector';
import {useStore} from 'effector-react';

export function useMappedStore<T, M>(store: Store<T>, mapFn: (s: T) => M) {
  const storeRef = React.useRef<Store<M>>();

  if (!storeRef.current) {
    storeRef.current = store.map(mapFn);
  }

  return useStore(storeRef.current);
}
