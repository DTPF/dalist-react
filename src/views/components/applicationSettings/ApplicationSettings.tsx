import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Modal, Popover, Row } from 'antd';
import UserContext from 'context/user/UserContext';
import ThemeContext from 'context/theme/ThemeContext';
import AppSettingsModalContext from 'context/appSettingsModal/AppSettingsModalContext';
import ColorPickerApp from 'views/UI/colorPickerApp';
import 'scss/globals.scss';
import './applicationSettings.scss';

export default function ApplicationSettings() {
  const { t: translate } = useTranslation();
  const { openSettingsModal, setOpenSettingsModal }: any = useContext(AppSettingsModalContext);
  const { dbUser, updateAppColor } = useContext(UserContext);
  const { currentThemeColor, setAppThemeColorAction } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;

  const handleChangeAppColor = () => {
    const userData = {
      colorPrimary: currentThemeColor.colorPrimary,
      colorPrimaryBg: currentThemeColor.colorPrimaryBg,
    };
    updateAppColor(userData);
    localStorage.setItem('theme-color', currentThemeColor.colorPrimaryBg);
    setOpenSettingsModal(false);
  };

  const handleCancel = () => {
    setAppThemeColorAction(dbUser.appInfo.colorPrimaryBg);
    setOpenSettingsModal(false);
  };

  return (
    <Modal
      title={translate('appSettingModalTitle')}
      style={{ textAlign: 'center' }}
      open={openSettingsModal}
      onOk={handleChangeAppColor}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel} className="button-secondary">
          {translate('cancel')}
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={false}
          onClick={handleChangeAppColor}
          style={{ backgroundColor: colorPrimaryBg, color: colorPrimary }}
          className="button-primary"
        >
          {translate('save')}
        </Button>,
      ]}
    >
      <AppSettingsForm />
    </Modal>
  );
}

function AppSettingsForm() {
  const { t: translate } = useTranslation();
  const { dbUser } = useContext(UserContext);
  const { colorPrimary, colorPrimaryBg } = dbUser.appInfo;

  return (
    <Row style={{ padding: 30 }}>
      <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
        <Popover placement="bottom" content={<ColorPickerApp />} trigger="click">
          <Button className="button-primary" style={{ color: colorPrimary, backgroundColor: colorPrimaryBg }}>
            {translate('inputAppColor')}
          </Button>
        </Popover>
      </Col>
    </Row>
  );
}
