import { render } from '@testing-library/react';
import App from './App';
import ResizeObserver from 'resize-observer-polyfill';

window.ResizeObserver = ResizeObserver;

test('renders app without errors', () => {
  render(<App />);
});
