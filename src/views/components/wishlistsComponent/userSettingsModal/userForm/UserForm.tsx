import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import 'scss/globals.scss';

export default function WishlistsSettingsForm({ userData, setUserData }: any) {
  const { t: translate } = useTranslation();

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 15 }}
      layout="horizontal"
      size="large"
      style={{ maxWidth: 600, paddingTop: '20px', paddingBottom: '1px' }}
    >
      <Form.Item label={translate('nameInput')}>
        <Input
          name="name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder={translate('nameInput') || ''}
          value={userData.name}
          className="input-primary"
        />
      </Form.Item>

      <Form.Item label={translate('lastnameInput')}>
        <Input
          name="lastname"
          onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
          placeholder={translate('lastnameInput') || ''}
          value={userData.lastname}
          className="input-primary"
        />
      </Form.Item>
    </Form>
  );
}
