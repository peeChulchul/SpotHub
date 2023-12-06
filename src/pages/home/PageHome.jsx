import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PageHome() {
  return (
    <div>
      PageHome
      <Outlet />
    </div>
  );
}
