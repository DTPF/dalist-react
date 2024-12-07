import { basePath, apiVersion } from './utils/config';
import getParams from './utils/getParams';

export const initGetUserAPI = async (token: string, auth0Id: object): Promise<any> => {
  const params = getParams('POST', token, auth0Id);
  const response = await fetch(`${basePath}/${apiVersion}/init-get-user`, params);
  const data = await response.json();
  return data;
};

export const updateUserApi = async (userId: string, data: object, token: string): Promise<any> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/update-user/${userId}`, params);
  const result = await response.json();
  return result;
};

export const changeLanguageAPI = async (data: object, token: string): Promise<any> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/change-language`, params);
  const result = await response.json();
  return result;
};

export const updateWishlistColorAPI = async (data: object, token: string): Promise<any> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/update-wishlist-color`, params);
  const result = await response.json();
  return result;
};

export const updateAppColorAPI = async (data: object, token: string): Promise<any> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/update-app-color`, params);
  const result = await response.json();
  return result;
};

export const changeWishlistsDirectionApi = async (data: object, token: string): Promise<any> => {
  const params = getParams('PUT', token, data);
  const response = await fetch(`${basePath}/${apiVersion}/change-wishlists-direction`, params);
  const result = await response.json();
  return result;
};
