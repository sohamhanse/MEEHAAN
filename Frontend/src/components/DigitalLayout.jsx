import { Outlet, useLocation } from 'react-router-dom';
import DigitalNavbar from './DigitalNavbar';
import { useEffect } from 'react';

const DigitalLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#050805' }}>
      <DigitalNavbar />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DigitalLayout;
