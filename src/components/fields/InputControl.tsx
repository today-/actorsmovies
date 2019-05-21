import React from 'react';
import {Input, InputProps} from 'semantic-ui-react';
import {IBoundProps} from '~/components/fields/CommonControl';

export const InputControl = (props: InputProps & IBoundProps) => (
  <Input {...props} />
);
