import { useContext } from 'react';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import { BgColorsOutlined, DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Popover } from 'antd';
import { ChromePicker } from 'react-color';
import invertHexColor from 'utils/invertHexColor';
import './cardFooter.scss';

export default function CardFooter({ wishlistItem, listStyle, setListStyle }: any) {
  const { removeWishlist, changeWishlistColor } = useContext(WishlistContext);
  const { dbUser } = useContext(UserContext);
  const { t: translate } = useTranslation();

  const handleOnChange = (e: any) => {
    const invertColor = invertHexColor(e.hex);
    setListStyle({
      color: invertColor,
      backgroundColor: e.hex,
    });
  };

  const handleOnChangeComplete = (e: any) => {
    const invertColor = invertHexColor(e.hex);
    changeWishlistColor(wishlistItem._id, { color: invertColor, backgroundColor: e.hex });
  };

  return (
    <footer
      className="wishlist-card-footer"
      style={{ backgroundColor: listStyle.backgroundColor, color: listStyle.color }}
    >
      <Popconfirm
        title={translate('deleteList')}
        description={translate('deleteListMessage')}
        onConfirm={() => removeWishlist(wishlistItem._id)}
        okText={translate('delete')}
        cancelText={translate('cancel')}
        style={{ backgroundColor: '#fff' }}
        className="popover-card-footer"
      >
        <DeleteOutlined />
      </Popconfirm>
      <p className="wishlist-card-footer__last-modified">
        {translate('lastModified')}{' '}
        <Moment locale={dbUser.appInfo.language} fromNow>
          {wishlistItem.updatedAt}
        </Moment>
      </p>
      <Popover
        content={
          <ChromePicker
            color={listStyle.backgroundColor}
            onChange={(e) => handleOnChange(e)}
            onChangeComplete={(e) => handleOnChangeComplete(e)}
          />
        }
        placement="bottom"
        trigger="click"
      >
        <BgColorsOutlined style={{ fontSize: '1rem' }} />
      </Popover>
    </footer>
  );
}
