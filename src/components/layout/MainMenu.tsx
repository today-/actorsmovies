import React from 'react';
import styled from 'styled-components';
import {useStore} from 'effector-react';
import {NavLink} from 'react-router-dom';
import {Container, Dropdown, Image, Menu} from 'semantic-ui-react';
import {postLogout} from '~/stores/auth';
import {t, toggleLanguage} from '~/i18n';
import {$user} from '~/stores/user';
import {MultiFlag} from '../ui';

export function MainMenu() {
  const {result} = useStore($user);

  if (!result) {
    return null;
  }

  const handleLogout = () => postLogout();

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as={NavLink} to={'/'} header>
          <Image size="small" src="/logo-white.png"/>
        </Menu.Item>

        <RightDropdown
          direction={'left'}
          item
          text={(
            <>
              <Image src={result.photo_url} circular/>
              <UserName>{result.name}</UserName>
            </>
          )}
        >
          <Dropdown.Menu>
            <Dropdown.Item as={NavLink} to={'/'} exact>
              {t('games-page')}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to={'/profile'}>
              {t('profile-page')}
            </Dropdown.Item>
            <Dropdown.Item as={NavLink} to={'/stats'}>
              {t('stats-page')}
            </Dropdown.Item>

            <Dropdown.Divider/>
            <Dropdown.Item onClick={toggleLanguage}>
              {t('toggle-language-button')} <MultiFlag/>
            </Dropdown.Item>

            {/* <Dropdown.Item>
                Сменить пароль
              </Dropdown.Item> */}

            <Dropdown.Divider/>
            <Dropdown.Item as="a" onClick={handleLogout}>
              {t('logout-button')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </RightDropdown>
      </Container>
    </Menu>
  );
}

const RightDropdown = styled(Dropdown)`
  display: flex;
  z-index: 9999;
  margin-left: auto !important;
`;

const UserName = styled.span`
  max-width: calc(100vw - 300px);
  line-height: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
`;
