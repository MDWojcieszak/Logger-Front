import { ReactNode } from 'react';

export enum MainNavigationRoute {
  ACCOUNTS = 'accounts',
  STREAMS = 'streams',
  SETTINGS = 'settings',
}

export enum CommonNavigationRoute {
  SIGN_IN = 'sign-in',
  MAIN_NAVIGATION = '*',
  NOT_FOUND = 'not-found',
}

export enum StreamNavigationRoute {
  STREAMS = '',
  MANAGE = ':streamId',
}

type RouteType<T> = {
  path: T;
  label: string;
  component: ReactNode;
  nested?: true;
};

export type CommonRouteType = RouteType<CommonNavigationRoute>;

export type MainRouteType = RouteType<MainNavigationRoute>;

export type StreamRouteType = RouteType<StreamNavigationRoute>;
