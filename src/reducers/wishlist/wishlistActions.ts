import { getWishlistsByUserIdApi, postNewWishlistItemApi, removeWishlistItemApi } from "api/wishlist";
import * as WishlistTypes from "reducers/wishlist/wishlistTypes";
import toast from 'react-hot-toast';

export const initWishlistsByUserIdAction =
	async function (
		dispatch: any,
		isAuthenticated: any,
		token: any,
		dbUser: any
	) {
		if (isAuthenticated && dbUser._id) {
			try {
				const response: any = await getWishlistsByUserIdApi(token.__raw, dbUser._id)

				if (response.status === 200) {
					const findCurrentWishlist =
						response.wishlists.find((item: any) => item.userId === dbUser._id);
					const currentWishlist =
						findCurrentWishlist ? findCurrentWishlist : response.wishlists[0]

					return dispatch({
						type: WishlistTypes.INIT_WISHLIST_BY_USER_ID,
						payload: {
							currentWishlist: currentWishlist,
							wishlists: response.wishlists
						}
					});
				} else {
					console.log(response.message);
				}
			} catch (err: any) {
				toast.error(err);
			}
		}
	}

export const addWishlistAction =
	function (
		dispatch: any,
		item: any,
		wishlistState: any,
		isAuthenticated: any,
		token: any
	) {
		if (isAuthenticated && wishlistState.currentWishlist._id) {
			postNewWishlistItemApi(wishlistState.currentWishlist._id, item, token.__raw).then((res: any) => {
				if (res.status === 200) {
					let newWishlistItems = wishlistState.currentWishlist.wishlistItems;
					newWishlistItems.push(res.newWishlistItem);

					let newWishlist = wishlistState.wishlists;
					const findIndex = newWishlist.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
					newWishlist[findIndex] = res.wishlistStored;

					toast.success(res.message);
					return dispatch({
						type: WishlistTypes.ADD_WISHLIST,
						payload: {
							newWishlistItems,
							newWishlist
						}
					});
				} else {
					toast.error(res.message);
				}
			})
		} else {
			let newWishlistItems = wishlistState.currentWishlist.wishlistItems;
			newWishlistItems.push(item);

			let newWishlist = wishlistState.wishlists;
			const findIndex = newWishlist.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
			newWishlist[findIndex] = newWishlistItems;

			const wishlistTemporary = [{
				wishlistName: 'Temporary list',
				wishlistItems: newWishlistItems
			}]

			return dispatch({
				type: WishlistTypes.ADD_WISHLIST,
				payload: {
					newWishlistItems,
					newWishlist: wishlistTemporary
				}
			});
		}
	}

export async function removeWishlistItemAction(
	dispatch: any,
	isAuthenticated: any,
	wishlistState: any,
	wishlistId: any,
	wishlistItemId: any,
	auth0User: any
) {
	try {
		if (isAuthenticated) {
			const newItem: any = await removeWishlistItemApi(wishlistId, wishlistItemId, auth0User.__raw)

			let newWishlist = wishlistState.wishlists;
			const findIndex = newWishlist.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
			newWishlist[findIndex] = newItem.newWishlist;

			dispatch({
				type: WishlistTypes.REMOVE_WISHLIST_ITEM,
				payload: {
					newWishlistItems: newItem.newWishlist,
					newWishlist
				}
			});
			
			return toast.success(`${newItem.message}`);
		}
	} catch (err) {
		console.log(err);
	}
}