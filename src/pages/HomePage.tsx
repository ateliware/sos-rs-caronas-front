import '@styles/index.scss';
import '../App.css';

import { useNavigate } from 'react-router-dom';
import { Icon, ItemList, PageHeader, Tab } from '@components';

type HomeItemProps = {
  title: string;
  description: string;
  icon?: string;
  route?: string;
};

function HomeItem(props: HomeItemProps) {
  const navigate = useNavigate();

  return (
    <div
      className="box-shadow-medium d-flex p-s-200"
      onClick={() => props.route && navigate(props.route)}
    >
      <div className="col-5 p-s-100">
        {props.icon && <Icon className="mr-s-100">{props.icon}</Icon>}
      </div>
      <div className="col-7">
        <h4 className="mb-s-100">{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

function HomePage() {
  const tabs = [
    {
      title: 'Home',
      component: (
        <ItemList
          items={[
            <>
              <HomeItem
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
              <HomeItem
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
