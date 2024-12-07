import { useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserSettingsModal from '../wishlistsComponent/userSettingsModal/UserSettingsModal';
import { useTranslation } from 'react-i18next';
import './userProfile.scss';
import ThemeContext from 'context/theme/ThemeContext';

export default function UserProfile() {
  const { user, loginWithRedirect }: any = useAuth0();
  const [openModal, setOpenModal] = useState(false);
  const { t: translate } = useTranslation();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary } = currentThemeColor;

  return (
    <div className="user-profile">
      <UserSettingsModal openModal={openModal} setOpenModal={setOpenModal} />
      {user ? (
        <img
          onClick={() => setOpenModal(!openModal)}
          src={user.picture}
          alt={`${user?.nickname} menu`}
          width={40}
          height={40}
        />
      ) : (
        <div
          onClick={() => loginWithRedirect()}
          className="user-profile__login"
          style={{ color: colorPrimary }}
        >
          {translate('login')}
        </div>
      )}
    </div>
  );
}
