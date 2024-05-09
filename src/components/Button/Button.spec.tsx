import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

describe('Button', () => {
  it('renders', () => {
    const { container } = render(<Button>content</Button>);
    const button = container.firstChild;

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toEqual(button);
    expect(button).toHaveClass('btn btn--primary btn--filled btn--medium');
    expect(button).toContainHTML(
      '<button class="btn btn--filled btn--primary btn--medium" type="button"><div class="btn__body"><div class="btn__body__text ">content</div></div></button>'
    );
  });

  it('renders with variants', () => {
    const { container } = render(
      <Button
        className="custom"
        size="large"
        design="outlined"
        color="secondary"
        prefixes="prefix"
        suffixes="suffix"
        onClick={() => {}}
      >
        content
      </Button>
    );
    const button = container.firstChild;

    expect(screen.getByRole('button')).toEqual(button);
    expect(button).toHaveClass(
      'btn custom btn--outlined btn--secondary btn--large'
    );
    expect(button).toContainHTML(
      '<button class="btn custom btn--outlined btn--secondary btn--large" type="button"><div class="btn__body">prefix<div class="btn__body__text ">content</div>suffix</div></button>'
    );
  });

  it('runs onClick properly', () => {
    const mockOnClick = jest.fn();
    const buttonText = 'test button';
    render(<Button onClick={mockOnClick}>{buttonText}</Button>);

    const button: HTMLButtonElement = screen.getByText(buttonText);

    expect(mockOnClick).not.toHaveBeenCalled();

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
