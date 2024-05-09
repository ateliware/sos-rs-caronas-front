import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('correctly renders the spinner icon', () => {
    render(<Spinner />);
    const spinnerIcon = screen.getByText('data_usage');

    expect(spinnerIcon).toBeInTheDocument();
    expect(spinnerIcon).toHaveClass('text-primary');
    expect(spinnerIcon).toHaveClass('spinner');
  });
});
