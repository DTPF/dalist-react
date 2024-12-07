import { useContext, useRef } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import './cardHeader.scss';

export default function CardHeader({ wishlistItem, listStyle }: any) {
  const { updateWishlist } = useContext(WishlistContext);
  const cardTitle: any = useRef(null);

  const handleUpdateTitle = (e: any) => {
    let { innerText } = e.target;
    if (!innerText || innerText === wishlistItem.wishlistName) {
      cardTitle.current.innerText = wishlistItem.wishlistName;
      return;
    }
    return updateWishlist(wishlistItem._id, { wishlistName: innerText });
  };

  return (
    <header
      className="wishlist-card-header"
      style={{ backgroundColor: listStyle.backgroundColor, color: listStyle.color }}
    >
      <span
        ref={cardTitle}
        key={wishlistItem._id}
        className="wishlist-card-header__textarea"
        style={{ color: listStyle.color }}
        role="textbox"
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => handleUpdateTitle(e)}
        aria-placeholder="Nombre de la lista"
        aria-labelledby={`label-${wishlistItem._id}`}
      >
        <div id={`label-${wishlistItem._id}`}>{wishlistItem.wishlistName}</div>
      </span>
    </header>
  );
}
