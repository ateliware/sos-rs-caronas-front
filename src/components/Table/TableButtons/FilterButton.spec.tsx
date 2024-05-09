import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FilterButton from './FilterButton';

describe('FilterButton', () => {
  it('should render text filter', async () => {
    const setFilters = jest.fn();
    render(
      <FilterButton
        filterType="text"
        setFilters={setFilters}
        filters={{ name: 'default' }}
        fromKey="name"
      />
    );
    const filterButton = screen.getByText('filter_list');
    expect(filterButton).toBeInTheDocument();
    fireEvent.mouseEnter(filterButton);
    const search = screen.getByPlaceholderText('Buscar...');
    expect(search).toBeInTheDocument();
    fireEvent.change(search, { target: { value: 'test' } });
    await waitFor(() => {
      return expect(setFilters).toHaveBeenCalledWith({ name: 'contains:test' });
    });

    setFilters.mockClear();
    const changeOperation = screen.getByLabelText('Texto igual');
    expect(changeOperation).toBeInTheDocument();
    fireEvent.click(changeOperation);
    await waitFor(() => {
      return expect(setFilters).toHaveBeenCalledWith({ name: 'eq:default' });
    });
  });

  it('should render with select', async () => {
    const setFilters = jest.fn();
    render(
      <FilterButton
        filterType="select"
        filterOptions={[
          { value: 'test', label: 'Test' },
          { value: 'test2', label: 'Test2' },
        ]}
        setFilters={setFilters}
        filters={{}}
        fromKey="name"
      />
    );
    const filterButton = screen.getByText('filter_list');
    expect(filterButton).toBeInTheDocument();
    fireEvent.mouseEnter(filterButton);
    const select = screen.getByText('Selecionar...')
      .parentElement as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    fireEvent.keyDown(select, { key: 'ArrowDown' });

    await waitFor(async () => {
      return await screen.findByText('Test2');
    });
    fireEvent.click(screen.getByText('Test2'));

    await waitFor(() => {
      return expect(setFilters).toHaveBeenCalledWith({ name: 'test2' });
    });
  });
});
