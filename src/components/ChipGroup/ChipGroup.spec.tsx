import { fireEvent, render, screen } from '@testing-library/react';
import ChipGroup from './ChipGroup';

const chips = [
  { key: 'chip1', text: 'Chip 1', active: true, disabled: false },
  { key: 'chip2', text: 'Chip 2', active: false, disabled: false },
  { key: 'chip3', text: 'Chip 3', active: false, disabled: true },
];

const onChipClick = jest.fn();

describe('ChipGroup', () => {
  it('renders', () => {
    render(<ChipGroup chips={chips} />);

    expect(screen.getByText('Chip 1')).toBeInTheDocument();
    expect(screen.getByText('Chip 2')).toBeInTheDocument();
    expect(screen.getByText('Chip 3')).toBeInTheDocument();
  });

  it('calls onChipClick when a chip is clicked', () => {
    render(<ChipGroup chips={chips} onChipClick={onChipClick} />);

    fireEvent.click(screen.getByText('Chip 2'));

    expect(onChipClick).toHaveBeenCalledWith(1);
  });

  test('disables disabled chips', () => {
    const { container } = render(<ChipGroup chips={chips} />);
    const enabledChips = container.querySelectorAll(
      '.chip.chip--primary.chip--medium.chip-group__chip'
    );
    const disabledChips = container.querySelectorAll(
      '.chip.chip--primary.chip--medium.chip-group__chip.chip--disabled'
    );

    expect(enabledChips).toHaveLength(chips.length);
    expect(disabledChips).toHaveLength(
      chips.filter((chip) => chip.disabled).length
    );
  });
});
