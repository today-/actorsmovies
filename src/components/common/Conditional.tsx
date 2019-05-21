import React from 'react';
import {Dimmer, Loader, Segment} from 'semantic-ui-react';
import {ErrorBlock} from '../ui';

interface ConditionalProps {
  error: React.ReactNode;
  loading: boolean;
}

export const Conditional: React.FC<ConditionalProps> = (props) => {
  const {error, loading, children} = props;

  if (error) {
    return (
      <ErrorBlock>
        {error}
      </ErrorBlock>
    );
  }

  if (loading) {
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader inverted/>
        </Dimmer>
      </Segment>
    );
  }

  return children as JSX.Element;
};
