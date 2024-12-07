import { useContext, useEffect, useState } from 'react';
import UserContext from 'context/user/UserContext';
import ThemeContext from 'context/theme/ThemeContext';
import UserForm from './userForm/UserForm';
import { useTranslation } from 'react-i18next';
import { Modal, Tag, Button, Popconfirm } from 'antd';
import 'scss/globals.scss';

export default function UserSettingsModal({ openModal, setOpenModal }: any) {
  const { dbUser, updateUser } = useContext(UserContext);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { i18n, t: translate } = useTranslation();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    language: '',
  });

  useEffect(() => {
    let isMounted = true;
    isMounted &&
      setUserData({
        name: dbUser.name,
        lastname: dbUser.lastname,
        language: dbUser.appInfo.language,
      });
    return () => {
      isMounted = false;
    };
  }, [dbUser]);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      updateUser(userData);
      i18n.changeLanguage(userData.language);
      setOpenModal(false);
      setConfirmLoading(false);
    }, 0);
  };

  const handleCancel = () => {
    setUserData({
      name: dbUser.name,
      lastname: dbUser.lastname,
      language: dbUser.appInfo.language,
    });
    setOpenModal(false);
  };

  // const handleDeleteAccount = () => {
  // 	console.log('Cuenta eliminada');
  // }

  const title = (
    <div>
      {translate('titleProfileModal')} <Tag color="geekblue">{dbUser.email}</Tag>
    </div>
  );

  return (
    <Modal
      title={title}
      open={openModal}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText="Cancelar"
      footer={[
        // <Popconfirm
        // 	key="delete-account"
        // 	title={translate('titlePopConfirm')}
        // 	description={translate('contentPopConfirm')}
        // 	onConfirm={handleDeleteAccount}
        // 	okText={translate('delete')}
        // 	cancelText={translate('cancel')}
        // 	style={{ backgroundColor: '#fff' }}
        // >
        // 	<Button danger>{translate('deleteAccount')}</Button>
        // </Popconfirm>,
        <Button key="back" onClick={handleCancel} className="button-secondary">
          {translate('cancel')}
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={confirmLoading}
          onClick={handleOk}
          className="button-primary"
          style={{ backgroundColor: colorPrimaryBg, color: colorPrimary }}
        >
          {translate('save')}
        </Button>,
      ]}
    >
      <UserForm userData={userData} setUserData={setUserData} />
    </Modal>
  );
}
