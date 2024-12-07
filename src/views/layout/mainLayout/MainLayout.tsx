import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout, List, Modal } from 'antd';
import ThemeContext from 'context/theme/ThemeContext';
import AppSettingsModalContext from 'context/appSettingsModal/AppSettingsModalContext';
import FooterWishlist from 'views/components/layout/footerWishlist';
import HeaderWishlist from 'views/components/layout/headerWishlist';
import Language from 'views/UI/language/Language';
import ApplicationSettings from 'views/components/applicationSettings/ApplicationSettings';
import { useTranslation } from 'react-i18next';
import {
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './mainLayout.scss';

export default function MainLayout() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);
  const { Header, Content, Footer } = Layout;

  return (
    <Layout className="main-layout">
      <ApplicationSettings />
      <GuestModal />
      <SiderNavBar navbarCollapsed={navbarCollapsed} setNavbarCollapsed={setNavbarCollapsed} />
      <Layout className="main-layout__container">
        <Header className="main-layout__container--header">
          <MenuIcon navbarCollapsed={navbarCollapsed} setNavbarCollapsed={setNavbarCollapsed} />
          <HeaderWishlist />
        </Header>
        <Content onClick={() => setNavbarCollapsed(true)}>
          <Outlet />
        </Content>
        <Footer className="main-layout__container--footer">
          <FooterWishlist />
        </Footer>
      </Layout>
    </Layout>
  );
}

function GuestModal() {
  const [showGuestModal, setShowGuestModal] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { t: translate } = useTranslation();

  useEffect(() => {
    let isMounted = true;
    if (!isAuthenticated) {
      setTimeout(() => {
        isMounted && setShowGuestModal(true);
      }, 5000);
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    let isMounted = true;
    const interval = setInterval(function () {
      if (!isAuthenticated) {
        isMounted && setShowGuestModal(true);
      }
    }, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  const data = [
    translate('guestModaldatalist1'),
    translate('guestModaldatalist2'),
    translate('guestModaldatalist3'),
    translate('guestModaldatalist4'),
  ];

  return (
    <Modal
      title={translate('guestModalTitle')}
      centered
      open={showGuestModal}
      onOk={() => loginWithRedirect()}
      onCancel={() => setShowGuestModal(false)}
      okText={translate('guestModalOnOk')}
      cancelText={translate('guestModalOnCancel')}
    >
      <List size="small" dataSource={data} renderItem={(item) => <List.Item>・{item}</List.Item>} />
    </Modal>
  );
}

function SiderNavBar({ navbarCollapsed, setNavbarCollapsed }: any) {
  const { user, loginWithRedirect, logout }: any = useAuth0();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;
  const { t: translate } = useTranslation();
  const { Sider } = Layout;
  const { setOpenSettingsModal }: any = useContext(AppSettingsModalContext);
  return (
    <Sider
      trigger={null}
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={navbarCollapsed}
      className="main-layout__sider"
      style={{ backgroundColor: colorPrimaryBg }}
    >
      <ul className="main-layout__sider--menu">
        <div className="main-layout__sider--menu__top">
          <div className="main-layout__sider--menu__top--language">
            <Language />
          </div>
        </div>
        <li
          onClick={() => {
            setNavbarCollapsed(true);
            setOpenSettingsModal(true);
          }}
          style={{ color: colorPrimary }}
        >
          <SettingOutlined /> {translate('settings')}
        </li>
        {user ? (
          <li onClick={logout} style={{ color: colorPrimary }}>
            <LogoutOutlined />
            {translate('logout')}
          </li>
        ) : (
          <li onClick={loginWithRedirect} style={{ color: colorPrimary }}>
            <LoginOutlined />
            {translate('login')}
          </li>
        )}
      </ul>
    </Sider>
  );
}

function MenuIcon({ navbarCollapsed, setNavbarCollapsed }: any) {
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary } = currentThemeColor;
  return navbarCollapsed ? (
    <MenuUnfoldOutlined
      className="main-layout__container--header__icon"
      onClick={() => setNavbarCollapsed(!navbarCollapsed)}
      style={{ color: colorPrimary }}
    />
  ) : (
    <MenuFoldOutlined
      className="main-layout__container--header__icon"
      onClick={() => setNavbarCollapsed(!navbarCollapsed)}
      style={{ color: colorPrimary }}
    />
  );
}
