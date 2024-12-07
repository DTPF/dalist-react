import WishlistsComponent from 'views/components/wishlistsComponent';
import HelmetSEO from 'utils/helmetSEO/HelmetSEO';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t: translate } = useTranslation();

  return (
    <HelmetSEO title={translate('htmlTitleHome')} description={translate('htmlDescriptionHome')}>
      <WishlistsComponent />
    </HelmetSEO>
  );
}
