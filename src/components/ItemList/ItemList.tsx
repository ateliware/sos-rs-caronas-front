import { Icon } from '../Icon';

interface Props {
  items?: Item[];
}

interface Item {
  title: string;
  description: string;
  icon?: string;
}

export default function ItemList(props: Props) {
  return (
    <>
      {props.items?.map((item, index: number) => (
        <div
          className="box-shadow-medium d-flex align-items-center justify-center p-s-200"
          key={index}
        >
          <div className="col-5 p-s-100">
            {item.icon && <Icon className="mr-s-100">{item.icon}</Icon>}
          </div>
          <div className="col-7">
            <h4 className="mb-s-100">{item.title}</h4>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}
