import { ReactNode } from 'react';

import logo from '@assets/logo.svg';
interface Props {
  children: ReactNode;
  loginImage?: string;
}

export default function LoginPageContainer({ loginImage, children }: Props) {
  return (
    <div
      style={{ backgroundColor: 'white' }}
      className="box-shadow-medium p-s-300 border-radius-100 d-flex flex-direction-column align-items-center justify-center"
    >
      <div className="row grid-gap-1" style={{ width: '650px' }}>
        <div className="col-md-6 d-flex align-items-center justify-center">
          <img
            src={loginImage || logo}
            alt="logo"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: 1000,
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="col-md-6 d-flex flex-direction-column justify-center grid-gap-1">
          {children}
        </div>
      </div>
    </div>
  );
}
