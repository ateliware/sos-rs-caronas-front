import { render } from '@testing-library/react';

import Chip from './Chip';

describe('Chip', () => {
  it('renders', () => {
    const { container } = render(<Chip>content</Chip>);
    const chip = container.firstChild;

    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass('chip chip--primary chip--medium');
    expect(chip).toContainHTML(
      '<div class="chip__body"><div class="chip__body__text">content</div></div>'
    );
  });

  it('renders with variants', () => {
    const { container } = render(
      <Chip
        className="custom"
        disabled
        outlined
        inverted
        size="small"
        color="secondary"
        prefixes="prefix"
        suffixes="suffix"
      >
        content
      </Chip>
    );
    const chip = container.firstChild;

    expect(chip).toHaveClass(
      'chip chip--secondary chip--small custom chip--disabled chip--outlined chip--inverted'
    );
    expect(chip).toContainHTML(
      '<div class="chip__body">prefix<div class="chip__body__text">content</div>suffix</div>'
    );
  });

  it('renders as anchor', () => {
    const { container } = render(
      <Chip href="#hi" target="_self">
        content
      </Chip>
    );
    const chip = container.firstChild;

    expect(chip).toContainHTML(
      '<a href="#hi" target="_self" class="chip chip--primary chip--medium"><div class="chip__body"><div class="chip__body__text">content</div></div></a>'
    );
  });

  it('renders as  button', () => {
    const { container } = render(
      <Chip onClick={() => alert('alert')}>content</Chip>
    );
    const chip = container.firstChild;

    expect(chip).toContainHTML(
      '<button class="chip chip--primary chip--medium"><div class="chip__body"><div class="chip__body__text">content</div></div></button>'
    );
  });
});
