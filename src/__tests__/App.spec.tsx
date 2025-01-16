import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from '../App';

test('renders the main heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', {
    name: /Gazillion Beers Tracker/i,
  });
  expect(heading).toBeInTheDocument();
});

test('renders the check-in button', () => {
  render(<App />);
  const button = screen.getByRole('button', {
    name: /I Drank a Gazillion Beers Today!/i,
  });
  expect(button).toBeInTheDocument();
});
