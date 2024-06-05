import { createContext } from 'react';
import { UserRole } from '~/types/user';

export enum CookieKey {
  USER_VISIT = 'user_visit',
}

export const TOKEN_TIME = 15 * 60 * 60;

export enum UserState {
  UNKNOWN,
  FIRST_VISIT,
  REQUIRES_LOGIN,
  LOGGED_IN,
}

export type UserData = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
};

export type AuthContextType = {
  userState: UserState;
  userData: UserData | undefined;
  setTokens: F1<{ access_token: string; refresh_token: string }, boolean>;
  removeTokens: F0;
};

export const AuthContext = createContext<AuthContextType | null>(null);
