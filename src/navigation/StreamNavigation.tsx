import { Route, Routes } from 'react-router-dom';
import { StreamNavigationRoute, StreamRouteType } from '~/navigation/types';
import { Streams } from '~/routes/Streams';
import { ManageStream } from '~/routes/Streams/ManageStream';

export const serverNavigationRoutes: StreamRouteType[] = [
  { path: StreamNavigationRoute.STREAMS, label: 'Servers', component: <Streams /> },
  { path: StreamNavigationRoute.MANAGE, label: 'Manage Servers', component: <ManageStream /> },
];

export const StreamNavigation = () => {
  const renderRoute = (route: StreamRouteType) => (
    <Route
      path={route.path}
      key={route.path}
      index={route.path === StreamNavigationRoute.STREAMS}
      element={route.component}
    />
  );
  return <Routes>{serverNavigationRoutes.map(renderRoute)}</Routes>;
};
