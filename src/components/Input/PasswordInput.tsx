import { useState } from 'react';

import { Icon } from '../Icon';

import Input, { Props } from './Input';

export default function PasswordInput(props: Props) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  return (
    <Input
      type={isPasswordVisible ? 'text' : 'password'}
      suffixes={
        <div
          className="btn__toggle pointer"
          title={isPasswordVisible ? 'Esconder senha' : 'Mostrar senha'}
          onClick={() => {
            setPasswordVisible((previous) => !previous);
          }}
        >
          <Icon
            className={`d-flex justify-center align-center mr-s-100 ${props.className}`}
          >
            {isPasswordVisible ? 'visibility_off' : 'visibility'}
          </Icon>
        </div>
      }
      {...props}
    />
  );
}
