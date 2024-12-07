import * as api from 'api/user.api';
import * as UserTypes from 'reducers/user/user.types';

export const initGetUserAction = async function (
  dispatch: any,
  isAuthenticated: boolean,
  auth0User: any,
  i18n: any,
  isLoading: boolean
) {
  const themeLS = localStorage.getItem('theme-color');
  if (themeLS) {
    document.getElementsByTagName<any>('META')[2].content = themeLS;
  }
  const initServices = (response: any) => {
    const { language, colorPrimaryBg } = response.user.appInfo;
    i18n.changeLanguage(language);
    localStorage.setItem('theme-color', colorPrimaryBg);
    document.getElementsByTagName<any>('META')[2].content = colorPrimaryBg;
  };
  if (!isLoading && isAuthenticated && auth0User.sub) {
    try {
      const response = await api.initGetUserAPI(auth0User.__raw, { userId: auth0User.sub });
      if (response.status === 200 || response.status === 201) {
        initServices(response);
        return dispatch({
          type: UserTypes.INIT_GET_USER,
          payload: {
            auth0User: auth0User,
            dbUser: response.user,
          },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
  } else {
    if (!isLoading) {
      return dispatch({
        type: UserTypes.SET_GUESS,
        payload: true,
      });
    }
  }
};

export const updateUserAction = async function (dispatch: any, userId: string, data: any, token: any) {
  try {
    const response = await api.updateUserApi(userId, data, token.__raw);

    if (response.status === 200) {
      return dispatch({
        type: UserTypes.UPDATE_USER,
        payload: response.user,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error();
  }
};

export const changeLanguageAction = async function (dispatch: any, data: any, token: any) {
  try {
    const response = await api.changeLanguageAPI(data, token.__raw);
    if (response.status === 200) {
      return dispatch({
        type: UserTypes.CHANGE_LANGUAGE,
        payload: data.language,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error();
  }
};

export const updateAppColorAction = async function (dispatch: any, data: any, token: any) {
  try {
    const { colorPrimary, colorPrimaryBg } = data;
    const response = await api.updateAppColorAPI(data, token.__raw);
    if (response.status === 200) {
      return dispatch({
        type: UserTypes.UPDATE_APP_COLOR,
        payload: { colorPrimary, colorPrimaryBg },
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error();
  }
};

export const updateWishlistColorAction = async function (dispatch: any, data: any, token: any) {
  const { wishlistColor, wishlistColorBg } = data;
  if (token) {
    try {
      const response = await api.updateWishlistColorAPI(data, token.__raw);
      if (response.status === 200) {
        return dispatch({
          type: UserTypes.CHANGE_WISHLIST_COLOR,
          payload: { wishlistColor, wishlistColorBg },
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      throw new Error();
    }
  } else {
    return dispatch({
      type: UserTypes.CHANGE_WISHLIST_COLOR,
      payload: { wishlistColor, wishlistColorBg },
    });
  }
};

export const changeWishlistsDirectionAction = async function (dispatch: any, data: any, token: any) {
  try {
    const response = await api.changeWishlistsDirectionApi(data, token.__raw);

    if (response.status === 200) {
      return dispatch({
        type: UserTypes.CHANGE_WISHLISTS_DIRECTION,
        payload: data.wishlistsDirection,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    throw new Error();
  }
};
