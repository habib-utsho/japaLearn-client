import { ReactNode } from "react";

export type TRole = "user" | "admin";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: TRole;
  profileImg: string;
  isDeleted: boolean;
};
export type TPasswordUpdate = {
  oldPassword: string;
  newPassword: string;
};
export type TDecodedUser = {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  profileImg: string;
  iat: number;
  exp: number;
};

export type TRoute = {
  path: string;
  element: ReactNode;
};
export type TSidebarRoute = {
  key: string;
  label: ReactNode;
  children?: TSidebarRoute[];
  icon?: ReactNode;
};

export type TRoutes = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutes[];
  icon?: ReactNode;
};

export type TMeta = {
  total: number;
  limit: number;
  page: number;
  totalPage: number;
};
export type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
};

export type TQueryParam = {
  name: string;
  value: any;
};
