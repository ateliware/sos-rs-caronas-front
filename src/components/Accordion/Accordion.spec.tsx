import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion', () => {
  it('renders the accordion title', () => {
    render(<Accordion title="Accordion Title" />);
    expect(screen.getByText('Accordion Title')).toBeInTheDocument();
  });

  it('renders the accordion content when initiallyOpen is true', () => {
    render(
      <Accordion title="Accordion Title" initiallyOpen={true}>
        Accordion Content
      </Accordion>
    );
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
  });

  it('does not render the accordion content when initiallyOpen is false', () => {
    render(
      <Accordion title="Accordion Title" initiallyOpen={false}>
        Accordion Content
      </Accordion>
    );
    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
  });

  it('toggles the accordion content when clicked', () => {
    render(
      <Accordion title="Accordion Title" initiallyOpen={false}>
        Accordion Content
      </Accordion>
    );

    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('accordion-icon'));
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('accordion-icon'));
    expect(screen.queryByTestId('accordion-content')).not.toBeInTheDocument();
  });
});
