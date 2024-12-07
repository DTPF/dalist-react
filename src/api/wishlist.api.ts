import { basePath, apiVersion } from './utils/config';
import { WishList } from 'interfaces/wishlist';
import getParams from './utils/getParams';

export const getWishlistsByUserIdApi = async (token: string): Promise<WishList> => {
  const params = getParams('GET', token, null);
  const response = await fetch(`${basePath}/${apiVersion}/get-wishlists-by-user-id`, params);
  const data = await response.json();
  return data;
};

export const postNewWishlistItemApi = async (
  wishlistId: string,
  item: object,
  token: string
): Promise<WishList> => {
  const params = getParams('POST', token, item);
  const response = await fetch(`${basePath}/${apiVersion}/post-new-wishlist-item/${wishlistId}`, params);
  const data = await response.json();
  return data as WishList;
};

export const postNewWishlistApi = async (data: object, token: string): Promise<WishList> => {
  const params = getParams('POST', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/post-new-wishlist`, params);
  const result = await response.json();
  return result as WishList;
};

export const removeWishlistItemApi = async (
  wishlistId: string,
  wishlistItemId: string,
  token: any
): Promise<WishList> => {
  const params = getParams('DELETE', token, null);
  const response = await fetch(
    `${basePath}/${apiVersion}/remove-wishlist-item/${wishlistId}/${wishlistItemId}`,
    params
  );
  const data = await response.json();
  return data;
};

export const setCurrentWishlistAPI = async (
  wishlistId: string,
  userId: string,
  token: string
): Promise<WishList> => {
  const params = getParams('GET', token, null);
  const response = await fetch(
    `${basePath}/${apiVersion}/get-wishlist-by-id/${wishlistId}/${userId}`,
    params
  );
  const data = await response.json();
  return data;
};

export const removeWishlistAPI = async (wishlistId: string, token: any): Promise<WishList> => {
  const params = getParams('DELETE', token, null);
  const response = await fetch(`${basePath}/${apiVersion}/remove-wishlist/${wishlistId}`, params);
  const data = await response.json();
  return data;
};

export const updateWishlistApi = async (
  wishlistId: string,
  data: object,
  token: string
): Promise<WishList> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/update-wishlist/${wishlistId}`, params);
  const result = await response.json();
  return result as WishList;
};

export const updateWishlistItemApi = async (
  wishlistId: string,
  wishlistItemId: string,
  data: object,
  token: string
): Promise<WishList> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(
    `${basePath}/${apiVersion}/update-wishlist-item/${wishlistId}/${wishlistItemId}`,
    params
  );
  const result = await response.json();
  return result as WishList;
};

export const changeWishlistColorApi = async (
  wishlistId: string,
  data: object,
  token: string
): Promise<WishList> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/change-wishlist-color/${wishlistId}`, params);
  const result = await response.json();
  return result as WishList;
};
