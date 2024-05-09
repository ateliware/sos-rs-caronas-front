import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Tab from './Tab';

describe('Tab component', () => {
  const tabs = [
    {
      title: 'Tab 1',
      component: <div>Content 1</div>,
      icon: 'icon-1',
    },
    {
      title: 'Tab 2',
      component: <div data-testid="tab-content">Content 2</div>,
      icon: 'icon-2',
    },
  ];

  it('should render tabs correctly', () => {
    render(<Tab tabs={tabs} tabSelected={0} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('should switch active tab on click', () => {
    render(<Tab tabs={tabs} tabSelected={0} />);

    const tab2 = screen.getByText('Tab 2');
    fireEvent.click(tab2);

    expect(screen.getByTestId('tab-content')).toContainHTML(
      '<div data-testid="tab-content">Content 2</div>'
    );
  });
});
