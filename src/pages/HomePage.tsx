import '@styles/index.scss';
import '../App.css';

import { Item, ItemList, PageHeader, Tab } from '@components';

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

  return (
    <>
      <PageHeader title="CaronaSOS" />
      <Tab tabs={tabs} tabSelected={0} />
    </>
  );
}

export default HomePage;
