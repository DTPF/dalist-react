import { useState } from 'react';
import CardHeader from './cardHeader';
import CardBody from './cardBody';
import CardFooter from './cardFooter';
import './wishlistCardItem.scss';

export default function WishlistCardItem({ wishlistItem }: any) {
  const [listStyle, setListStyle] = useState({
    color: wishlistItem.color,
    backgroundColor: wishlistItem.backgroundColor,
  });

  return (
    <section className="wishlist-card-item">
      <CardHeader wishlistItem={wishlistItem} listStyle={listStyle} />
      <CardBody wishlistItem={wishlistItem} listStyle={listStyle} />
      <CardFooter wishlistItem={wishlistItem} listStyle={listStyle} setListStyle={setListStyle} />
    </section>
  );
}
