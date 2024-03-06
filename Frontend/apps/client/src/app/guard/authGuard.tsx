import * as React from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
  is_logined: boolean;
};

export default function ProtectedRoute({
  isAuthenticated,
  authenticationPath,
  outlet,
  is_logined,
}: ProtectedRouteProps) {
  if (isAuthenticated && is_logined) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}
