import { Icon } from '../Icon';

interface Props {
  title: string;
  description: string;
  icon: string;
}

export default function NotificationStatus(props: Props) {
  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-sm-12 col-md-6 text-center">
        <div>
          <h1 className="p-s-300">{props.title}</h1>
          <img
            src={props.icon}
            alt="icon"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: 1000,
              objectFit: 'contain',
            }}
            className="p-s-300"
          />
          <p className="p-s-300">{props.description}</p>
        </div>
      </div>
    </div>
  );
}
