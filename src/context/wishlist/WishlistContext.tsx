import { createContext } from 'react';
import initialWishlistState from './initialWishlistState';

const WishlistContext = createContext(initialWishlistState);

export default WishlistContext;
