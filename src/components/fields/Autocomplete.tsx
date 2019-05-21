import React from 'react';
import styled from 'styled-components';
import {Search, SearchProps, SearchResultData} from 'semantic-ui-react';
import {IBoundProps} from '~/components/fields/CommonControl';

export function AutocompleteControl(props: SearchProps & IBoundProps) {
  const {onSearchChange, onChange} = props;

  const handleSearchChange = (e: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchResultData) => {
    onChange(e, data);
    if (onSearchChange) {
      onSearchChange(e, data);
    }
  };

  return (
    <AutocompleteSearch
      {...props}
      onSearchChange={handleSearchChange}
    />
  );
}

const AutocompleteSearch = styled(Search)`
  width: 100%;

  .ui.input {
    width: 100%;
  }

  &.ui.search .prompt {
      border-radius: 3px;
  }
`;
