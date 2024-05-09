import { PropsWithChildren } from 'react';
import { Drawer } from '../Drawer';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'components';
import { useAuthContext } from '@contexts/AuthProvider';
import blueprintLogo from '@assets/blueprint-logo.svg';

type Props = {
  collapsed?: boolean;
  className?: string;
};
export default function Sidebar(props: PropsWithChildren<Props>) {
  const navigate = useNavigate();
  const sidebarClasses = ['sidebar'];
  if (props.collapsed) sidebarClasses.push('sidebar--collapsed');
  if (props.className) sidebarClasses.push(props.className);
  const { logout, user } = useAuthContext();

  return (
    <Drawer
      className={sidebarClasses.join(' ')}
      size={props.collapsed ? 'none' : 'md'}
      open={true}
      float="left"
      overlay={false}
      header={
        <div className="d-flex justify-center">
          <img
            width="169"
            src={blueprintLogo}
            className="App-logo"
            alt="logo"
          />
        </div>
      }
    >
      {props.children}
      <div
        className="d-flex align-items-center pt-10"
        style={{
          width: '100%',
          bottom: '120px',
          paddingTop: '10%',
          paddingBottom: '10%',
        }}
      >
        <span className="sidebutton__label sidebutton__label--xs !pr-0">
          {user?.name}
        </span>
        <div
          title="Configurações"
          className="pointer d-flex align-items-center text-primary ml-s-100"
          onClick={() => navigate('/me')}
        >
          <Icon>settings</Icon>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          bottom: '60px',
          borderTop: '1px solid #3F608E33',
        }}
      >
        <Button
          className="sidebutton__label sidebutton__label--xs"
          prefixes={<Icon>logout</Icon>}
          design="transparent"
          onClick={() => logout()}
        >
          Exit
        </Button>
      </div>
    </Drawer>
  );
}
