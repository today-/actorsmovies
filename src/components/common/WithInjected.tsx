import React from 'react';
import {createStoreObject} from 'effector';
import {createStoreConsumer, StoreConsumer} from 'effector-react';
import {Events, InjectionCreator, Stores} from '~/utils/injected';

type WithInjectedProps = {
  inject: InjectionCreator;
  component: React.ComponentType<any>
};

class WithInjectedComponent extends React.Component<WithInjectedProps> {
  private stores: Stores;
  private events: Events;
  private consumer: StoreConsumer<any> = null;

  constructor(props: WithInjectedProps) {
    super(props);

    const {stores, events} = props.inject();
    this.stores = stores;
    this.events = events;

    const merged = createStoreObject(this.stores);
    this.consumer = createStoreConsumer(merged);
  }

  render() {
    const {component: WrappedComponent, inject, ...rest} = this.props;
    const Consumer = this.consumer;

    return (
      <Consumer>
        {(state: any) => (
          <WrappedComponent
            {...rest}
            {...state}
            {...this.events}
          />
        )}
      </Consumer>
    );
  }
}

export function withInjected<Z>(fn: InjectionCreator): any {
  return (WrappedComponent: React.ComponentType<Z>) => (props: Z) => (
    <WithInjectedComponent
      {...props}
      inject={fn}
      component={WrappedComponent}
    />
  );
}
