import { useContext, useState } from 'react';
import { Popover, Input } from 'antd';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext';
import ThemeContext from 'context/theme/ThemeContext';
import ChromePickerWishlist from 'views/UI/colorPickerWishlist';
import { useTranslation } from 'react-i18next';
import { BgColorsOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './createWishlist.scss';
import { useAuth0 } from '@auth0/auth0-react';
const { Search } = Input;

export default function CreateWishlist() {
  const { dbUser } = useContext(UserContext);
  const { postNewWishlist } = useContext(WishlistContext);
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [inputValue, setInputValue] = useState('');
  const { t: translate } = useTranslation();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary } = currentThemeColor;

  const iconColorSelect = (
    <Popover placement="bottom" content={<ChromePickerWishlist />} trigger="click">
      <BgColorsOutlined
        style={{
          fontSize: 20,
          color: dbUser.appInfo.wishlistColorBg,
        }}
      />
    </Popover>
  );

  return (
    <section className="create-wishlist">
      <Search
        className="create-wishlist__input"
        placeholder={translate('inputPlaceholderCreateWL') || ''}
        enterButton={
          <PlusCircleOutlined
            style={{ color: colorPrimary }}
            className="create-wishlist__input--add-wishlist-icon"
          />
        }
        size="large"
        suffix={iconColorSelect}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSearch={(e) => {
          if (isAuthenticated) {
            postNewWishlist(e);
            setInputValue('');
          } else {
            loginWithRedirect();
          }
        }}
      />
    </section>
  );
}
