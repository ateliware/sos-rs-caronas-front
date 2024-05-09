import { fireEvent, render, screen } from '@testing-library/react';

import SortButton from './SortButton';

describe('SortButton', () => {
  it('should render', () => {
    render(<SortButton setFilters={jest.fn()} filters={{}} fromKey="name" />);
    expect(screen.getByText('arrow_drop_up')).toBeInTheDocument();
  });

  it('should order asc', () => {
    const setFilters = jest.fn();
    render(<SortButton fromKey="name" filters={{}} setFilters={setFilters} />);
    fireEvent.click(screen.getByText('arrow_drop_up'));
    expect(setFilters).toHaveBeenCalledWith({ order: 'name' });
  });

  it('should order desc', () => {
    const setFilters = jest.fn();
    render(
      <SortButton
        fromKey="name"
        filters={{ order: 'name' }}
        setFilters={setFilters}
      />
    );
    fireEvent.click(screen.getByText('arrow_drop_up'));
    expect(setFilters).toHaveBeenCalledWith({ order: '-name' });
  });

  it('should reset order', () => {
    const setFilters = jest.fn();
    render(
      <SortButton
        fromKey="name"
        filters={{ order: '-name' }}
        setFilters={setFilters}
      />
    );
    fireEvent.click(screen.getByText('arrow_drop_down'));
    expect(setFilters).toHaveBeenCalledWith({ order: '' });
  });
});
