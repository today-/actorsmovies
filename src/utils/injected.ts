import React from 'react';
import {useStore} from 'effector-react';
import {createStoreObject, Effect, Event, Store} from 'effector';

type AnyEvent = Effect<any, any, any> | Event<any>;

export type Events = { [key in string]: AnyEvent };

export type Stores = { [key in string]: Store<any> };

type Injection = {
  stores: Stores,
  events: Events
};

export type InjectionCreator = () => Injection;

export type WithInjected<
  IC extends InjectionCreator,
  RT extends ReturnType<IC> = ReturnType<IC>,
  S extends RT['stores'] = RT['stores'],
  E = RT['events']
> = {
  [key in keyof S]?: S[key]['defaultState']
} & {
  [key in keyof E]?: E[key]
};

export function useInjected<IC extends InjectionCreator>(fn: IC): WithInjected<IC> {
  const storeRef = React.useRef<Store<any>>();
  const eventRef = React.useRef<Events>();

  if (!storeRef.current) {
    const {stores, events} = fn();
    storeRef.current = createStoreObject(stores);
    eventRef.current = events;
  }

  const connectedStores = useStore(storeRef.current);

  return ({...connectedStores, ...eventRef.current});
}
