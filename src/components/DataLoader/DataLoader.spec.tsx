import { render, screen } from '@testing-library/react';

import DataLoader from './DataLoader';

describe('DataLoader', () => {
  it('renders Skeleton component if data is not provided', () => {
    const { container } = render(
      <DataLoader data={'teste'} isLoading={true} />
    );
    const skeletonComponent = container.querySelector(
      '.react-loading-skeleton'
    );

    expect(skeletonComponent).toBeInTheDocument();
    expect(skeletonComponent).toHaveStyle('width: 98%');
  });

  it('renders the data at the specified position', () => {
    const data = {
      somePosition: 'Test data',
    };

    render(<DataLoader data={data.somePosition} isLoading={false} />);
    const dataElement = screen.getByText('Test data');

    expect(dataElement).toBeInTheDocument();
  });
});
