import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SideBar } from '~/components/SideBar';
import { AnimatedRoute } from '~/navigation/AnimatedRoute';
import { ProtectedRoute } from '~/navigation/ProtectedRoute';
import { StreamNavigation } from '~/navigation/StreamNavigation';
import { MainNavigationRoute, MainRouteType } from '~/navigation/types';
import { Accounts } from '~/routes/Accounts';
import { Settings } from '~/routes/Settings';

export const mainNavigationRoutes: MainRouteType[] = [
  { path: MainNavigationRoute.STREAMS, label: 'Streams', component: <StreamNavigation />, nested: true },
  { path: MainNavigationRoute.ACCOUNTS, label: 'Accounts', component: <Accounts /> },
  { path: MainNavigationRoute.SETTINGS, label: 'Settings', component: <Settings /> },
];

export const MainNavigation = () => {
  const location = useLocation();

  const renderRoute = (route: MainRouteType) => (
    <Route
      path={route.path + `${route.nested ? '/*' : ''}`}
      key={route.path}
      index={route.path === MainNavigationRoute.STREAMS}
      element={
        <ProtectedRoute>
          <AnimatedRoute key={route.path}>{route.component}</AnimatedRoute>
        </ProtectedRoute>
      }
    />
  );

  return (
    <>
      <SideBar items={mainNavigationRoutes} />
      <AnimatePresence mode='wait' key='navigation' presenceAffectsLayout>
        <Routes key={location.pathname} location={location}>
          {mainNavigationRoutes.map(renderRoute)}
          <Route path='/' element={<Navigate to={MainNavigationRoute.STREAMS} />} />
          <Route path='*' element={<Navigate to='not-found' />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};
