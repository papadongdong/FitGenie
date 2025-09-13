import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import ChatPage from '@/components/pages/ChatPage';
import BMIPage from '@/components/pages/BMIPage';
import DietPage from '@/components/pages/DietPage';
import TipsPage from '@/components/pages/TipsPage';
import ProfilePage from '@/components/pages/ProfilePage';

function LayoutWrapper() {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "bmi",
        element: <BMIPage />,
      },
      {
        path: "diet",
        element: <DietPage />,
      },
      {
        path: "tips",
        element: <TipsPage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
