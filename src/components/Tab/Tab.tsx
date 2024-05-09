import { useState } from 'react';

import { Icon } from '../Icon';

interface Props {
  tabs?: Tabs[];
  tabSelected: number;
}

interface Tabs {
  title: String;
  component: React.ReactNode;
  icon?: String;
}

export default function Tab(props: Props) {
  const [tabActive, setTabActive] = useState(props.tabSelected);

  return (
    <>
      <div className="tabs">
        {props.tabs?.map((tab, index: number) => {
          const tabClasses = [
            'tab',
            'd-flex',
            'justify-center',
            'align-items-center',
          ];

          if (index === tabActive) {
            tabClasses.push('active');
          }

          return (
            <div
              key={index}
              className={tabClasses.join(' ')}
              onClick={() => setTabActive(index)}
            >
              {tab.icon && <Icon className="mr-s-100">{tab.icon}</Icon>}
              <span className="tab-span unselectable">{tab.title}</span>
            </div>
          );
        })}
      </div>
      <div className="tab-content">{props.tabs?.[tabActive]?.component}</div>
    </>
  );
}
