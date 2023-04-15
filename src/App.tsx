import { RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import WishlistProvider from 'context/wishlist/WishlistProvider';
import UserProvider from 'context/user/UserProvider';
import router from './routes/router';
import { isLocalhost } from 'utils/isLocalhost';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Auth0Provider
      domain={`${process.env.REACT_APP_AUTH0_DOMAIN}`}
      clientId={
        isLocalhost
          ? `${process.env.REACT_APP_AUTH0_CLIENT_ID_DEVELOPMENT}`
          : `${process.env.REACT_APP_AUTH0_CLIENT_ID_PRODUCTION}`
      }
      authorizationParams={{ redirect_uri: window.location.origin + '/' }}
    >
      <UserProvider>
        <WishlistProvider>
          <Toaster />
          <RouterProvider
            router={router}
            fallbackElement={<></>}
          />
        </WishlistProvider>
      </UserProvider >
    </Auth0Provider>
  );
}