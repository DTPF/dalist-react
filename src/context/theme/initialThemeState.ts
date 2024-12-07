export interface InitialThemeContextType {
  colorPrimary: string;
  colorPrimaryBg: string;
  wishlistColor: string;
  wishlistColorBg: string;
}

export interface UpdateCurrentThemeContextType {
  currentThemeColor: InitialThemeContextType;
  setAppThemeColorAction: (color: string) => void;
  setWishlistThemeColorAction: (color: string) => void;
}

export const initialThemeContext = {
  currentThemeColor: {
    colorPrimary: '',
    colorPrimaryBg: '',
    wishlistColor: '',
    wishlistColorBg: '',
  },
  setAppThemeColorAction: (color: string) => {},
  setWishlistThemeColorAction: (color: string) => {},
};

export const initialThemeState = {
  colorPrimary: '',
  colorPrimaryBg: '',
  wishlistColor: '',
  wishlistColorBg: '',
};
