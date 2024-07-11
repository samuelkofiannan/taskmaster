import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/**
 * Test suite for the App component.
 */
test('renders TaskMaster app', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TaskMaster/i);
  expect(linkElement).toBeInTheDocument();
});
