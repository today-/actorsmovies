import React, {useState} from 'react';
import {Responsive, SemanticWIDTHS, Statistic} from 'semantic-ui-react';
import {IStatCategory} from '~/api/stats';
import {t} from '~/i18n';

export function StatsTable({users, games, items, finished, finished_percent}: IStatCategory) {
  const [rows, setRows] = useState<SemanticWIDTHS>(2);

  return (
    <Responsive
      onUpdate={(e, {width}) => (width > 480) ? setRows(2) : setRows(1)}
      fireOnMount={true}
    >
      <Statistic.Group size={'small'} widths={rows}>
        {users && (
          <>
            <Statistic label={t('stats-users', users)} value={users}/>
            <Statistic/>
          </>
        )}

        <Statistic label={t('stats-games', games)} value={games}/>
        <Statistic label={t('stats-items', items)} value={items}/>

        <Statistic label={t('stats-games-finished', finished)} value={finished}/>
        <Statistic label={t('stats-percent', finished_percent)} value={`${finished_percent}%`}/>
      </Statistic.Group>
    </Responsive>
  );
}
