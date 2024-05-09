import { render } from '@testing-library/react';

import Map from './Map';

describe('Map', () => {
  it('renders', () => {
    render(
      <Map
        value={{
          lat: 0,
          lng: 0,
        }}
        onChange={() => {}}
      />
    );
  });
});
