import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
// Layouts
const MainLayout = lazy(() => import('views/layout/mainLayout'));
// Pages
const WishlistPage = lazy(() => import('../views/pages/wishlistPage/WishlistPage'));
const HomePage = lazy(() => import('views/pages/homePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<></>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<></>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <Suspense fallback={<></>}>
            <WishlistPage />
          </Suspense>
        ),
        children: [
          {
            path: ':isCompleted',
            element: (
              <Suspense fallback={<></>}>
                <WishlistPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <div>Not found</div>,
      },
    ],
  },
]);

export default router;
