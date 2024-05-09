import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@components';

export type ItemProps = {
  title: string;
  description: string;
  icon?: string;
  route?: string;
};

export function Item(props: ItemProps) {
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

interface ItemListProps {
  items?: ReactNode[];
}

export default function ItemList(props: ItemListProps) {
  return (
    <>
      {props.items?.map((item, index: number) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}
