import { useContext } from 'react';
import { ChromePicker as ColorPicker } from 'react-color';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext';
import ThemeContext from 'context/theme/ThemeContext';
import invertHexColor from 'utils/invertHexColor';
import './colorPickerWishlist.scss';

export default function ColorPickerWishlist() {
  const { updateWishlistColor } = useContext(UserContext);
  const { wishlistsInfo } = useContext(WishlistContext);
  const { currentThemeColor, setWishlistThemeColorAction } = useContext(ThemeContext);

  const handleSaveWishlistColor = (color: any) => {
    const invertColor = invertHexColor(color);
    setWishlistThemeColorAction(color);
    updateWishlistColor({
      wishlistColor: invertColor,
      wishlistColorBg: color,
    });
  };

  return (
    <div className="color-picker-wishlist-container">
      {/* Colors used */}
      {wishlistsInfo.colorsUsed.length > 0 ? (
        <div className="color-picker-wishlist-container__colors-used">
          {wishlistsInfo.colorsUsed.map((color: string) => (
            <button
              key={color}
              style={{
                color: color,
                backgroundColor: color,
                border: 0,
              }}
              onClick={() => handleSaveWishlistColor(color)}
            />
          ))}
        </div>
      ) : (
        <p className="color-picker-wishlist-container__empty-colors-msg">No hay colores guardados</p>
      )}
      <div className="color-picker-wishlist-container__input">
        <ColorPicker
          color={currentThemeColor.wishlistColorBg}
          onChange={(e) => setWishlistThemeColorAction(e.hex)}
          onChangeComplete={(e) => handleSaveWishlistColor(e.hex)}
        />
      </div>
    </div>
  );
}
