import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from '../App';

test('renders the Vite + React heading', () => {
  render(<App />);
  const heading = screen.getByText(/Vite \+ React/i);
  expect(heading).toBeInTheDocument();
});
