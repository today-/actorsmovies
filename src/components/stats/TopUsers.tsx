import React from 'react';
import styled from 'styled-components';
import {Image, List} from 'semantic-ui-react';
import {ITopUser} from '~/api/stats';
import {t} from '~/i18n';

export const TopUsers: React.FC<{ top: ITopUser[] }> = ({top}) => (
  <CenteredList
    verticalAlign="middle"
    relaxed="very"
    size="huge"
    ordered
  >
    {top.map(({name, photo_url, finished_count}) => (
      <List.Item key={name}>
        <Image avatar src={photo_url}/>
        <ListContent>
          <List.Header>
            {name}
          </List.Header>
          <List.Description>
            {finished_count} {t('stats-games-finished', Number(finished_count))}
          </List.Description>
        </ListContent>
      </List.Item>
    ))}
  </CenteredList>
);

const CenteredList = styled(List)`
  text-align: center;
  .item:before {
    line-height: 44px;
  }
`;

const ListContent = styled(List.Content)`
  text-align: left;
  width: 300px !important;
  .header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
