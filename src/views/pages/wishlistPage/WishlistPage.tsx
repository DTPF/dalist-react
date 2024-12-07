import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import WishlistContext from 'context/wishlist/WishlistContext';
import WishlistComponent from 'views/components/wishlistComponent';
import { useTranslation } from 'react-i18next';
import HelmetSEO from 'utils/helmetSEO';

export default function WishlistPage() {
  const params = useParams();
  const { currentWishlist } = useContext(WishlistContext);
  const { t: translate } = useTranslation();

  return (
    <HelmetSEO
      title={`Dalist | ${currentWishlist.wishlistName}`}
      description={translate('htmlDescriptionWishlist')}
    >
      <WishlistComponent params={params} />
    </HelmetSEO>
  );
}
