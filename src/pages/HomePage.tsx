import '@styles/index.scss';
import '../App.css';
import { Icon, PageHeader, Tab } from '@components';
import { useState } from 'react';

export default function HomePage() {
  const tabs = [
    {
      title: 'Home',
      component: (
        <>
          <div style={{ width: '100%' }}>
            <div className="box-shadow-medium d-flex align-items-center justify-center p-s-200">
              <div className="col-5 p-s-100">
                <Icon type="material" className="material-icons">
                  directions_car
                </Icon>
              </div>
              <div className="col-7">
                <h4 className="mb-s-100">Ofertar carona</h4>
                <p>
                  Cadastre um veículo, agende uma viagem e convide passageiros.
                </p>
              </div>
            </div>
            <div className="box-shadow-medium d-flex align-items-center justify-center p-s-200">
              <div className="col-5 p-s-100">
                <Icon type="material" className="material-icons">
                  schedule
                </Icon>
              </div>
              <div className="col-7">
                <h4 className="mb-s-100">Candidatar-se como voluntário</h4>
                <p>
                  Sinalize sua disponibilidade para voluntariar e encontre uma
                  carona.
                </p>
              </div>
            </div>
          </div>
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
      <div>
        <Tab tabs={tabs} tabSelected={0}></Tab>
      </div>
    </>
  );
}
