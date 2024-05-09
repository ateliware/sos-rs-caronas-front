import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTooltip from './CustomTooltip';

describe('CustomTooltip', () => {
  const defaultProps = {
    children: <div>Test Content</div>,
  };

  it('renders children correctly', () => {
    render(<CustomTooltip {...defaultProps} />);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom minWidth prop', () => {
    render(<CustomTooltip {...defaultProps} minWidth="200px" />);
    const tooltipElement = screen.getByText('Test Content').parentElement;
    expect(tooltipElement?.className).toContain('custom-tooltip');
    expect(tooltipElement?.style.minWidth).toBe('200px');
  });

  it('applies default minWidth prop when not provided', () => {
    render(<CustomTooltip {...defaultProps} />);
    const tooltipElement = screen.getByText('Test Content').parentElement;
    expect(tooltipElement?.className).toContain('custom-tooltip');
    expect(tooltipElement?.style.minWidth).toBe('unset');
  });
});
