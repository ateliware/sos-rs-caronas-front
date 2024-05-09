import '@styles/index.scss';
import '../App.css';
import { Icon, ItemList, PageHeader, Tab } from '@components';

export default function HomePage() {
  const tabs = [
    {
      title: 'Home',
      component: (
        <>
          <ItemList
            items={[
              {
                title: 'Ofertar carona',
                description:
                  'Cadastre um veículo, agende uma viagem e convide passageiros.',
                icon: 'directions_car',
                route: '/ride_offer',
              },
              {
                title: 'Candidatar-se como voluntário',
                description:
                  'Sinalize sua disponibilidade para voluntariar e encontre uma carona.',
                icon: 'schedule',
              },
            ]}
          />
        </>
      ),
    },
    {
      title: 'Caronas',
      component: <div>Conteúdo de Caronas</div>,
    },
  ];

  return (
    <>
      <PageHeader title="CaronaSOS"></PageHeader>
      <Tab tabs={tabs} tabSelected={0}></Tab>
    </>
  );
}
