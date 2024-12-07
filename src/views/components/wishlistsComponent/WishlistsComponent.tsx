import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext';
import ThemeContext from 'context/theme/ThemeContext';
import WishlistCardItem from './wishlistCardItem';
import FilterDropdown from './filterDropdown/FilterDropdown';
import CreateWishlist from '../createWishlist/CreateWishlist';
import Spinner from 'views/UI/spinner';
import { useTranslation } from 'react-i18next';
import { Button, Empty, Skeleton, Space } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './wishlistsComponent.scss';

export default function WishlistsComponent() {
  const { wishlists, isLoading, postNewWishlist } = useContext(WishlistContext);
  const { dbUser, changeWishlistsDirection } = useContext(UserContext);
  const { isLoading: isLoadingAuth0, isAuthenticated, loginWithRedirect } = useAuth0();
  const { t: translate } = useTranslation();
  const { currentThemeColor } = useContext(ThemeContext);
  const { colorPrimary, colorPrimaryBg } = currentThemeColor;
  type updatedAt = string | number | Date;
  const { wishlistsDirection } = dbUser.wishlistsInfo;

  switch (dbUser.wishlistsInfo.wishlistsOrder) {
    case 'updatedAt':
      wishlists.sort(function (a: { updatedAt: updatedAt }, b: { updatedAt: updatedAt }) {
        const c: any = new Date(a.updatedAt);
        const d: any = new Date(b.updatedAt);
        if (dbUser.wishlistsInfo.wishlistsDirection === 'desc') return d - c;
        return c - d;
      });
      break;

    case 'createdAt':
      wishlists.sort(function (a: { createdAt: updatedAt }, b: { createdAt: updatedAt }) {
        const c: any = new Date(a.createdAt);
        const d: any = new Date(b.createdAt);
        if (dbUser.wishlistsInfo.wishlistsDirection === 'desc') return d - c;
        return c - d;
      });
      break;

    case 'name':
      wishlists.sort((a: { wishlistName: string }, b: { wishlistName: string }) => {
        if (dbUser.wishlistsInfo.wishlistsDirection === 'desc')
          return b.wishlistName.localeCompare(a.wishlistName);
        return a.wishlistName.localeCompare(b.wishlistName);
      });
      break;
  }

  return (
    <>
      {isLoadingAuth0 && isLoading ? (
        <Space className="wishlists-component__skeleton">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Skeleton.Node key={item} active>
              <Spinner />
            </Skeleton.Node>
          ))}
        </Space>
      ) : (
        <section className="wishlists-component">
          <div className="wishlists-component__filters">
            <div className="wishlists-component__filters--left-side">
              <div className="wishlists-component__filters--left-side__select">
                <FilterDropdown />
              </div>
            </div>
            <CreateWishlist />
            <div className="wishlists-component__filters--right-side">
              {wishlistsDirection === 'desc' ? (
                <ArrowDownOutlined onClick={() => changeWishlistsDirection({ wishlistsDirection: 'asc' })} />
              ) : (
                <ArrowUpOutlined onClick={() => changeWishlistsDirection({ wishlistsDirection: 'desc' })} />
              )}
            </div>
          </div>

          <div className="wishlists-component__items">
            {wishlists.length === 0 && !isLoading ? (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ width: 400, height: 200 }}
                description={<span>{translate('emptyWishlists')}</span>}
                className="wishlists-component__items--empty-msg"
              >
                <Button
                  className="button-primary"
                  style={{
                    color: colorPrimary,
                    backgroundColor: colorPrimaryBg,
                  }}
                  onClick={() => {
                    if (isAuthenticated) {
                      postNewWishlist(null);
                    } else {
                      loginWithRedirect();
                    }
                  }}
                  type="primary"
                >
                  {translate('createWishlist')}
                </Button>
              </Empty>
            ) : (
              <>
                {wishlists.map((item: { _id: string }) => (
                  <WishlistCardItem key={item._id} wishlistItem={item} />
                ))}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
