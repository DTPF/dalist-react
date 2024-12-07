export interface DbUser {
  _id: string;
  userId: string;
  email: string;
  name: string;
  lastname: string;
  guess: any;
  appInfo: {
    colorPrimary: string;
    colorPrimaryBg: string;
    language: string;
    wishlistColor: string;
    wishlistColorBg: string;
  };
  wishlistsInfo: any;
}
