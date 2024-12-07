const initialUserState = {
  auth0User: {},
  dbUser: {
    _id: '',
    userId: '',
    email: '',
    name: '',
    lastname: '',
    guess: false,
    appInfo: {
      colorPrimary: '#fff',
      colorPrimaryBg: '#232F3E',
      language: 'en',
      wishlistColor: '#fff',
      wishlistColorBg: '#697C8C',
    },
    wishlistsInfo: {
      currentWishlist: '',
      wishlistsOrder: '',
      wishlistsDirection: '',
    },
  },
  updateUser: (data: any) => {},
  changeLanguage: (data: any) => {},
  updateWishlistColor: (color: any) => {},
  updateAppColor: (color: any) => {},
  changeWishlistsDirection: (wishlistsDirection: any) => {},
};

export default initialUserState;
