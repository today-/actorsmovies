import React from 'react';
import {Icon, Header} from 'semantic-ui-react';
import {FullWidthSegment} from '~/components/ui';
import {t} from '~/i18n';

export const NoGames: React.FC = () => (
  <FullWidthSegment basic placeholder>
    <Header as={'h3'} icon>
      <Icon name={'paper plane outline'}/>
      {t('no-games')}
    </Header>
  </FullWidthSegment>
);
