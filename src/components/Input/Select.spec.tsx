import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Select, { generateOptions, generateValue } from './Select';

describe('Select', () => {
  it('renders', async () => {
    const { container } = await waitFor(() => {
      return render(
        <Select
          value={'value'}
          className="custom"
          label="Label"
          caption="Caption"
          disabled
          error
        />
      );
    });

    const selectWrapper = container.querySelector('.form-input__container');
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(selectWrapper).toHaveClass(
      'form-input__container form-input__container--error form-input__container--disabled custom',
      { exact: true }
    );
  });

  it('triggers onSelect', async () => {
    const onSelect = jest.fn();
    const options = [
      { value: 1, label: '1 Option' },
      { value: 2, label: '2 Option' },
      { value: 3, label: '2 Option' },
    ];

    const { container } = await waitFor(() => {
      return render(
        <Select
          value={null}
          className="custom"
          label="Label"
          onSelect={onSelect}
          options={options}
          error
        />
      );
    });

    const select = container.querySelector('.form-select')!;

    fireEvent.keyDown(select, { key: 'ArrowDown' });

    fireEvent.click(await screen.findByText('1 Option'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(options[0]);
  });

  it('generateValue when is string', async () => {
    const value = generateValue({ value: 'teste' });

    expect(value).toEqual({ value: 'teste', label: 'teste' });
  });

  it('generateValue when is object', async () => {
    const value = generateValue({ value: { name: 'teste' } });

    expect(value).toEqual({ name: 'teste' });
  });

  it('generateValue when is array and has fromKey and isMulti', async () => {
    const value = generateValue({
      value: [{ id: '123', name: 'teste' }],
      isMulti: true,
      fromKey: 'name',
    });

    expect(value).toEqual([{ value: '123', label: 'teste' }]);
  });

  it('generateOptions when is string', async () => {
    const options = generateOptions({
      options: ['option', 'option2'],
      value: 'option',
    });

    expect(options!.length).toEqual(2);
    expect(options!.at(0)).toEqual({ value: 'option', label: 'option' });
    expect(options!.at(1)).toEqual({ value: 'option2', label: 'option2' });
  });

  it('generateOptions when has fromKey', async () => {
    const options = generateOptions({
      fromKey: 'name',
      //@ts-ignore
      options: [{ id: '123', name: 'teste' }],
      value: 'option',
    });

    expect(options!.length).toEqual(1);
    expect(options!.at(0)).toEqual({ value: '123', label: 'teste' });
  });
  it('generateOptions when has fromKey and without id', async () => {
    const options = generateOptions({
      fromKey: 'name',
      //@ts-ignore
      options: [{ name: 'teste' }],
      value: 'option',
    });

    expect(options!.length).toEqual(1);
    expect(options!.at(0)).toEqual({ value: 'teste', label: 'teste' });
  });

  it('generateOptions without everything', async () => {
    const options = generateOptions({
      //@ts-ignore
      options: [{ id: '123', name: 'teste' }],
      value: 'option',
    });

    expect(options!.length).toEqual(1);
    expect(options!.at(0)).toEqual({ id: '123', name: 'teste' });
  });
});
