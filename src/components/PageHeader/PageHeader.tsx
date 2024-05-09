import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../Icon';

type Props = {
  title: string;
  actions?: ReactNode;
  backButton?: boolean;
};

export default function PageHeader(props: Props) {
  const navigate = useNavigate();

  const className = ['row d-flex align-items-center'];
  if (props.backButton) {
    className.push('pointer');
  }

  return (
    <div className="d-flex justify-between">
      <div
        className={className.join(' ')}
        onClick={() => {
          if (props.backButton) {
            navigate(-1);
          }
        }}
      >
        {props.backButton && (
          <div className="mr-s-100" title="Voltar">
            <Icon>arrow_back</Icon>
          </div>
        )}
        <h2 className="m-0">{props.title}</h2>
      </div>
      <div className="d-flex page-header-actions" style={{ gap: 20 }}>
        {props.actions}
      </div>
    </div>
  );
}
