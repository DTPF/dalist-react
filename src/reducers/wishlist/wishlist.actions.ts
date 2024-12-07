import * as api from 'api/wishlist.api';
import * as WishlistTypes from 'reducers/wishlist/wishlist.types';
import toast from 'react-hot-toast';
import { DbUser } from 'interfaces/user';
type WishlistItem = {
  _id: string;
  wishlistItems: string | any[];
  updatedAt: string | number;
  backgroundColor: string;
  position: number;
};

export async function initWishlistsByUserIdAction(
  dispatch: any,
  isAuthenticated: boolean,
  token: any,
  dbUser: DbUser
) {
  if (isAuthenticated) {
    try {
      const response: any = await api.getWishlistsByUserIdApi(token);

      if (response.status === 200) {
        let totalWishlistsNotes = 0;
        let lastModified: string | number = '2023-04-05T12:25:50.606Z';
        let colorsUsed: any[] = [];

        response.wishlists.forEach((item: WishlistItem) => {
          totalWishlistsNotes += item.wishlistItems.length;
          if (item.updatedAt > lastModified) lastModified = item.updatedAt;
          if (!colorsUsed.includes(item.backgroundColor)) {
            colorsUsed.push(item.backgroundColor);
          }
        });

        const wishlistsInfo = {
          totalWishlists: response.wishlists.length,
          totalWishlistsNotes,
          lastModified,
          colorsUsed,
        };

        // Set current wishlist
        const findCurrentWishlist = response.wishlists.find(
          (item: WishlistItem) => item._id === dbUser.wishlistsInfo.currentWishlist
        );
        const currentWishlist = findCurrentWishlist ? findCurrentWishlist : response.wishlists[0];

        dispatch({
          type: WishlistTypes.INIT_WISHLIST_BY_USER_ID,
          payload: {
            currentWishlist,
            wishlists: response.wishlists,
            wishlistsInfo,
          },
        });
      }
      return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false });
    } catch (err) {
      return toast.error('Ha ocurrido un problema');
    }
  }
  if (dbUser.guess) {
    return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false });
  }
}

export async function postWishlistAction(
  dispatch: any,
  data: any,
  isAuthenticated: boolean,
  token: any,
  colorsUsedArray: any[],
  dbUser: any
) {
  if (isAuthenticated) {
    try {
      const response: any = await api.postNewWishlistApi(data, token.__raw);
      if (!colorsUsedArray.includes(data.backgroundColor)) {
        colorsUsedArray.push(data.backgroundColor);
      }
      if (response.status === 200) {
        toast.success(response.message);
        return dispatch({
          type: WishlistTypes.POST_WISHLIST,
          payload: {
            wishlist: response.wishlist,
            colorsUsed: colorsUsedArray,
          },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      return toast.error('No se ha podido crear');
    }
  } else {
    return dispatch({
      type: WishlistTypes.POST_WISHLIST_GUEST,
      payload: dbUser.appInfo,
    });
  }
}

export async function addWishlistItemAction(
  dispatch: any,
  item: object,
  wishlistState: any,
  isAuthenticated: boolean,
  token: any
) {
  if (isAuthenticated && wishlistState.currentWishlist._id) {
    try {
      const response: any = await api.postNewWishlistItemApi(wishlistState.currentWishlist._id, item, token);

      if (response.status === 200) {
        let newWishlistItems = wishlistState.currentWishlist.wishlistItems;
        newWishlistItems.push(response.newWishlistItem);

        let wishlists = wishlistState.wishlists;
        const findIndex = wishlists.findIndex(
          (item: WishlistItem) => item._id === wishlistState.currentWishlist._id
        );
        wishlists[findIndex] = response.wishlistStored;

        toast.success(response.message);
        return dispatch({
          type: WishlistTypes.ADD_WISHLIST_ITEM,
          payload: {
            newWishlistItems,
            wishlists,
          },
        });
      } else {
        toast.error('No se ha podido crear la nota');
      }
    } catch (error: any) {
      toast.error('No se ha podido crear la nota');
    }
  } else {
    let newWishlistItems = wishlistState.currentWishlist.wishlistItems;
    newWishlistItems.push(item);

    let newWishlist = wishlistState.wishlists;
    const findIndex = newWishlist.findIndex(
      (item: WishlistItem) => item._id === wishlistState.currentWishlist._id
    );
    newWishlist[findIndex] = newWishlistItems;

    const wishlistTemporary = [
      {
        wishlistName: 'Temporary list',
        wishlistItems: newWishlistItems,
      },
    ];

    return dispatch({
      type: WishlistTypes.ADD_WISHLIST_ITEM,
      payload: {
        newWishlistItems,
        newWishlist: wishlistTemporary,
      },
    });
  }
}

export async function removeWishlistItemAction(
  dispatch: any,
  isAuthenticated: boolean,
  wishlistState: any,
  wishlistId: string,
  wishlistItemId: string,
  token: any
) {
  try {
    if (isAuthenticated) {
      const response: any = await api.removeWishlistItemApi(wishlistId, wishlistItemId, token);

      let wishlists = wishlistState.wishlists;
      const findIndex = wishlists.findIndex(
        (item: WishlistItem) => item._id === wishlistState.currentWishlist._id
      );
      wishlists[findIndex] = response.wishlist;

      let orderedList: any = [];
      response.wishlist.wishlistItems.forEach((item: WishlistItem, index: number) => {
        item.position = index;
        orderedList.push(item);
      });

      try {
        const response: any = await api.updateWishlistApi(wishlistId, { wishlistItems: orderedList }, token);

        return dispatch({
          type: WishlistTypes.REMOVE_WISHLIST_ITEM,
          payload: {
            wishlists,
            currentWishlist: response.wishlist,
          },
        });
      } catch (error) {
        return toast.error('No se ha podido borrar la nota');
      }
    }
  } catch (err) {
    return toast.error('No se ha podido borrar la nota');
  }
}

export async function setCurrentWishlistAction(
  dispatch: any,
  wishlist: any,
  isAuthenticated: boolean,
  token: any,
  dbUser: DbUser
) {
  try {
    if (isAuthenticated) {
      const response: any = await api.setCurrentWishlistAPI(wishlist._id, dbUser._id, token);

      if (response.status === 200) {
        dispatch({
          type: WishlistTypes.SET_CURRENT_WISHLIST,
          payload: {
            currentWishlist: response.wishlist,
          },
        });
        return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false });
      }
    }
  } catch (error) {
    return toast.error('No se ha podido encontrar la lista');
  }
}

export async function removeWishlistAction(
  dispatch: any,
  isAuthenticated: boolean,
  wishlistState: any,
  wishlistId: string,
  token: any
) {
  try {
    if (isAuthenticated) {
      const response: any = await api.removeWishlistAPI(wishlistId, token);

      if (response.status === 200) {
        const filteredWishlist = wishlistState.wishlists.filter(
          (item: WishlistItem) => item._id !== response.wishlistItemIdDeleted
        );

        toast.success(`${response.message}`);
        return dispatch({
          type: WishlistTypes.REMOVE_WISHLIST,
          payload: {
            wishlists: filteredWishlist,
          },
        });
      } else {
        return toast.error('No se ha podido borrar');
      }
    }
  } catch (err) {
    return toast.error('No se ha podido borrar');
  }
}

export async function updateWishlistAction(
  dispatch: any,
  isAuthenticated: boolean,
  wishlistState: any,
  wishlistId: string,
  token: any,
  data: any
) {
  try {
    if (isAuthenticated) {
      const response: any = await api.updateWishlistApi(wishlistId, data, token);

      if (response.status === 200) {
        let wishlists = wishlistState.wishlists;
        const findIndex = wishlists.findIndex((item: WishlistItem) => item._id === response.wishlist._id);
        wishlists[findIndex] = response.wishlist;

        return dispatch({
          type: WishlistTypes.UPDATE_WISHLIST,
          payload: {
            wishlists,
            currentWishlist: response.wishlist,
          },
        });
      } else {
        return toast.error(`${response.message}`);
      }
    }
  } catch (err) {
    return toast.error(`Error del servidor`);
  }
}

export async function updateWishlistItemAction(
  dispatch: any,
  isAuthenticated: boolean,
  wishlistId: string,
  wishlistItemId: string,
  wishlistState: { wishlists: any },
  token: any,
  data: object
) {
  try {
    if (isAuthenticated) {
      const response: any = await api.updateWishlistItemApi(wishlistId, wishlistItemId, data, token);

      if (response.status === 200) {
        let wishlists = wishlistState.wishlists;
        const findIndex = wishlists.findIndex((item: WishlistItem) => item._id === response.wishlist._id);
        wishlists[findIndex] = response.wishlist;

        return dispatch({
          type: WishlistTypes.UPDATE_WISHLIST,
          payload: {
            wishlists,
            currentWishlist: response.wishlist,
          },
        });
      } else {
        return toast.error('No se ha podido actualizar');
      }
    }
  } catch (err) {
    return toast.error('No se ha podido actualizar');
  }
}

export async function changeWishlistColorAction(
  isAuthenticated: boolean,
  wishlistId: string,
  token: any,
  data: any,
  wishlistState: any
) {
  try {
    if (isAuthenticated) {
      const response: any = await api.changeWishlistColorApi(wishlistId, data, token);
      const itemIndex = wishlistState.wishlists.findIndex((item: any) => item._id === wishlistId);
      wishlistState.wishlists[itemIndex].color = data.color;
      wishlistState.wishlists[itemIndex].backgroundColor = data.backgroundColor;
      if (response.status !== 200) {
        throw new Error('changeWishlistColorAction request failed');
      }
    }
  } catch (err) {
    return toast.error('No se ha podido actualizar');
  }
}
