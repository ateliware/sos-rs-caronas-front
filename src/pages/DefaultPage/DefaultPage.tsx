import blueprintLogo from '@assets/blueprint-logo.svg';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Icon,
  MainContent,
  Sidebar,
  SidebarButton,
  SidebarSeparator,
} from '@components';
import { useState } from 'react';

export default function DefaultPage() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = () => {
    setCollapsed(!collapsed); // Toggle the value of collapsed state
  };

  const isButtonActive = (route: string) => {
    return location.pathname === route;
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="header--left">
            <div onClick={handleMenuClick} className="pointer">
              <Icon className="font-s-550 text-primary">menu</Icon>
            </div>
          </div>
          <div className="header--right">
            <img
              width="219"
              src={blueprintLogo}
              className="App-logo"
              alt="logo"
            />
          </div>
        </header>
        <Sidebar collapsed={collapsed} className="bg-white">
          <SidebarButton
            active={isButtonActive('/home')}
            label="Home"
            onClick={() => navigate('/home')}
          />
          <SidebarButton
            active={isButtonActive('/users')}
            label="Users"
            onClick={() => navigate('/users')}
          />
          <SidebarSeparator />
        </Sidebar>
        <MainContent collapsed={collapsed}>
          <Outlet />
        </MainContent>
      </div>
    </>
  );
}
