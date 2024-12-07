import { useContext } from 'react';
import ThemeContext from 'context/theme/ThemeContext';
import UserProfile from 'views/components/userProfile';
import './headerWishlist.scss';

export default function HeaderWishlist() {
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;

  return (
    <div style={{ backgroundColor: colorPrimaryBg }} className="header-wishlist">
      <UserProfile />
      <div className="header-wishlist__title">
        <h1 style={{ color: colorPrimary }}>DaList</h1>
      </div>
    </div>
  );
}
