import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ConfigProvider } from 'antd';
import UserContext from 'context/user/UserContext';
import ThemeContext from './ThemeContext';
import invertHexColor from 'utils/invertHexColor';
import { InitialThemeContextType, initialThemeState } from './initialThemeState';
import { ChildrenProps } from 'interfaces/globals';

export default function ThemeProvider({ children }: ChildrenProps) {
  const { dbUser } = useContext(UserContext);
  const [currentThemeColor, setThemeColor] = useState<InitialThemeContextType>(initialThemeState);
  const themeLS = localStorage.getItem('theme-color');
  const isHexValid = (color: string) => /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);

  useEffect(() => {
    let isMounted = true;
    isMounted &&
      setThemeColor({
        colorPrimary: themeLS ? invertHexColor(themeLS) : '#fff',
        colorPrimaryBg: themeLS ? themeLS : '#232F3E',
        wishlistColor: dbUser.appInfo.wishlistColor,
        wishlistColorBg: dbUser.appInfo.wishlistColorBg,
      });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeLS]);

  const setAppThemeColorAction = useCallback(
    (color: string) => {
      if (isHexValid(color)) {
        setTimeout(function () {
          const invertColor = invertHexColor(color);
          setThemeColor({
            ...currentThemeColor,
            colorPrimary: invertColor,
            colorPrimaryBg: color,
          });
        }, 50);
      }
      document.getElementsByTagName<any>('META')[2].content = color;
    },
    [currentThemeColor]
  );

  const setWishlistThemeColorAction = useCallback(
    (color: string) => {
      if (isHexValid(color)) {
        setTimeout(function () {
          const invertColor = invertHexColor(color);
          setThemeColor({
            ...currentThemeColor,
            wishlistColor: invertColor,
            wishlistColorBg: color,
          });
        }, 10);
      }
    },
    [currentThemeColor]
  );

  const memoProvider = useMemo(
    () => ({
      currentThemeColor,
      setAppThemeColorAction,
      setWishlistThemeColorAction,
    }),
    [currentThemeColor, setAppThemeColorAction, setWishlistThemeColorAction]
  );

  return (
    <ConfigProvider theme={{ token: { colorPrimary: currentThemeColor.colorPrimaryBg } }}>
      <ThemeContext.Provider value={memoProvider}>{children}</ThemeContext.Provider>
    </ConfigProvider>
  );
}
