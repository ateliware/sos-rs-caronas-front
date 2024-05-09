import '@styles/index.scss';
import '../App.css';
import logo from '@assets/logo-small.svg';

import { Button, Icon, Item, ItemList, PageHeader, Tab } from '@components';
import { useAuthContext } from '@contexts/AuthProvider';

function HomePage() {
  const tabs = [
    {
      title: 'Home',
      component: (
        <ItemList
          items={[
            <>
              <Item
                key="offer"
                title={'Ofertar carona'}
                description={
                  'Cadastre um veículo, agende uma viagem e convide passageiros.'
                }
                icon={'directions_car'}
                route={'/ride_offer'}
              />
            </>,
            <>
              <Item
                key="volunteer"
                title={'Candidatar-se como voluntário'}
                description={
                  'Sinalize sua disponibilidade para voluntariar e encontre uma carona.'
                }
                icon={'schedule'}
                route={'/volunteer'}
              />
            </>,
          ]}
        />
      ),
    },
    {
      title: 'Caronas',
      component: <div>Conteúdo de Caronas</div>,
    },
  ];
  const { logout } = useAuthContext();

  return (
    <>
      <div className="pb-s-300 pt-s-300 align-items-center">
        <PageHeader
          logo={logo}
          actions={
            <Button
              className="sidebutton__label sidebutton__label--xs"
              prefixes={<Icon>logout</Icon>}
              design="transparent"
              onClick={() => logout()}
            ></Button>
          }
        />
      </div>
      <Tab tabs={tabs} tabSelected={0} />
    </>
  );
}

export default HomePage;
