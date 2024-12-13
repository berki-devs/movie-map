import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { routes } from './routes';
import Page404 from '../pages/404';

export const Routings = () => {
  return (
    <Suspense>
      <Routes>
        {routes.map((routeProps) => (
          <Route {...routeProps} key={routeProps.path} />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};
