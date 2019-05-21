import React, {useLayoutEffect} from 'react';
import {useStore} from 'effector-react';
import {Divider} from 'semantic-ui-react';
import {$stats, getStats} from '~/stores/stats';
import {StatsTable} from './StatsTable';
import {Conditional} from '../common';
import {$user} from '~/stores/user';
import {TopUsers} from './TopUsers';
import {H3} from '~/components/ui';
import {t} from '~/i18n';

export function Stats() {
  const {result, loading, error} = useStore($stats);
  const {result: currentUser} = useStore($user);

  useLayoutEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <H3>
        {t('stats-page')}
      </H3>
      <Conditional
        error={error}
        loading={loading}
        children={result && (
          <>
            <Divider section horizontal children={t('stats-all-users')}/>
            <StatsTable {...result.total}/>

            <Divider section horizontal children={currentUser.name}/>
            <StatsTable {...result.user}/>

            <Divider section horizontal children={t('stats-top-users')}/>
            <TopUsers top={result.top}/>
          </>
        )}
      />
    </>
  );
}
