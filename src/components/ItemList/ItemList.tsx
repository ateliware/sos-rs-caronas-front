import { ReactNode } from 'react';

interface Props {
  items?: ReactNode[];
}

export default function ItemList(props: Props) {
  return (
    <>
      {props.items?.map((item, index: number) => (
        <div key={index}>{item}</div>
      ))}
    </>
  );
}
