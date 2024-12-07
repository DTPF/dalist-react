import * as UserTypes from './user.types';

export default function userReducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case UserTypes.INIT_GET_USER:
      return {
        auth0User: payload.auth0User,
        dbUser: payload.dbUser,
      };

    case UserTypes.UPDATE_USER:
      return {
        ...state,
        dbUser: payload,
      };

    case UserTypes.SET_GUESS:
      return {
        ...state,
        dbUser: { ...state.dbUser, guess: payload },
      };

    case UserTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        dbUser: {
          ...state.dbUser,
          appInfo: {
            ...state.dbUser.appInfo,
            language: payload,
          },
        },
      };

    case UserTypes.CHANGE_WISHLIST_COLOR:
      return {
        ...state,
        dbUser: {
          ...state.dbUser,
          appInfo: {
            ...state.dbUser.appInfo,
            wishlistColor: payload.wishlistColor,
            wishlistColorBg: payload.wishlistColorBg,
          },
        },
      };

    case UserTypes.UPDATE_APP_COLOR:
      return {
        ...state,
        dbUser: {
          ...state.dbUser,
          appInfo: {
            ...state.dbUser.appInfo,
            colorPrimary: payload.colorPrimary,
            colorPrimaryBg: payload.colorPrimaryBg,
          },
        },
      };

    case UserTypes.CHANGE_WISHLISTS_DIRECTION:
      return {
        ...state,
        dbUser: {
          ...state.dbUser,
          wishlistsInfo: {
            ...state.dbUser.wishlistsInfo,
            wishlistsDirection: payload,
          },
        },
      };

    default:
      return state;
  }
}
