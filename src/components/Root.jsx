import { Outlet } from 'react-router-dom';

import HeaderSimple from './Header';

export default function Root() {
  return (
    <>
      <HeaderSimple />
      <Outlet />
    </>
  );
}
