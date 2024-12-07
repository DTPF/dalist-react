import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import * as action from 'reducers/user/user.actions';
import UserContext from './UserContext';
import userReducer from 'reducers/user/user.reducer';
import initialUserState from './initialUserState';
import { useTranslation } from 'react-i18next';
import { ChildrenProps } from 'interfaces/globals';

export default function UserProvider(props: ChildrenProps) {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const { i18n } = useTranslation();

  useEffect(() => {
    const initGetUser = async () => {
      const token = await getIdTokenClaims();
      action.initGetUserAction(dispatch, isAuthenticated, token, i18n, isLoading);
    };
    initGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading, getIdTokenClaims]);

  const updateUser = useCallback(
    async (data: any) => {
      if (!isLoading && isAuthenticated) {
        const token = await getIdTokenClaims();
        action.updateUserAction(dispatch, userState.dbUser._id, data, token);
      }
    },
    [isAuthenticated, userState, isLoading, getIdTokenClaims]
  );

  const changeLanguage = useCallback(
    async (data: any) => {
      if (!isLoading && isAuthenticated) {
        const token = await getIdTokenClaims();
        action.changeLanguageAction(dispatch, data, token);
      }
    },
    [isAuthenticated, isLoading, getIdTokenClaims]
  );

  const updateAppColor = useCallback(
    async (data: any) => {
      if (!isLoading) {
        const token = await getIdTokenClaims();
        action.updateAppColorAction(dispatch, data, token);
      }
    },
    [isLoading, getIdTokenClaims]
  );

  const updateWishlistColor = useCallback(
    async (data: any) => {
      if (!isLoading) {
        const token = await getIdTokenClaims();
        action.updateWishlistColorAction(dispatch, data, token);
      }
    },
    [isLoading, getIdTokenClaims]
  );

  const changeWishlistsDirection = useCallback(
    async (data: any) => {
      if (!isLoading) {
        const token = await getIdTokenClaims();
        action.changeWishlistsDirectionAction(dispatch, data, token);
      }
    },
    [isLoading, getIdTokenClaims]
  );

  const memoProvider = useMemo(
    () => ({
      ...userState,
      updateUser,
      changeLanguage,
      updateAppColor,
      updateWishlistColor,
      changeWishlistsDirection,
    }),
    [userState, updateUser, changeLanguage, updateWishlistColor, updateAppColor, changeWishlistsDirection]
  );

  return <UserContext.Provider value={memoProvider}>{props.children}</UserContext.Provider>;
}
