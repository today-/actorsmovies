import React from 'react';
import {IBoundProps} from '~/components/fields/CommonControl';
import {Select, SelectProps} from 'semantic-ui-react';

export const SelectControl = (props: SelectProps & IBoundProps) => (
  <Select {...props} />
);
