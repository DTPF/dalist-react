import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import WishlistContext from 'context/wishlist/WishlistContext';
import './statusBar.scss';

export default function StatusBar() {
  const { currentWishlist } = useContext(WishlistContext);
  const filteredActive = currentWishlist.wishlistItems.filter((item: any) => item.isCompleted === false);
  const filteredCompleted = currentWishlist.wishlistItems.filter((item: any) => item.isCompleted === true);

  return (
    <div className="status-bar">
      <div className="status-bar__nav">
        <NavLink to={'/wishlist/'}>
          <RenderButton title="Todo" />
          <GetWishlistLength length={currentWishlist.wishlistItems.length} />
        </NavLink>
        <NavLink to={'/wishlist/active'}>
          <RenderButton title="Activo" />
          <GetWishlistLength length={filteredActive.length} />
        </NavLink>
        <NavLink to={'/wishlist/completed'}>
          <RenderButton title="Completado" />
          <GetWishlistLength length={filteredCompleted.length} />
        </NavLink>
      </div>
    </div>
  );
}

function RenderButton({ title }: any) {
  return <button className="status-bar__nav--button">{title}</button>;
}

function GetWishlistLength({ length }: any) {
  return <div className="status-bar__nav--items-count">{length}</div>;
}
