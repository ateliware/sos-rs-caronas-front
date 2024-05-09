import '@styles/index.scss';
import '../App.css';

import { Icon, Item, ItemList, PageHeader, Tab } from '@components';
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
  const { logout, user } = useAuthContext();

  return (
    <>
      <div className="p-s-300 align-items-center">
        <PageHeader
          title="CaronaSOS"
          actions={
            <a onClick={() => logout()}>
              <Icon>logout</Icon>
            </a>
          }
        />
      </div>
      <Tab tabs={tabs} tabSelected={0} />
    </>
  );
}

export default HomePage;
