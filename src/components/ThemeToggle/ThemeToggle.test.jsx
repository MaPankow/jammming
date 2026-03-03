import ThemeToggle from './ThemeToggle';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';



it('switches text on click', async () => {
  render (<ThemeToggle />);
  let button = screen.getByText('☀️ Light Mode');
  expect(button).toBeInTheDocument();
  expect(document.documentElement).not.toHaveClass('light');
  // testet, ob Dark Mode eingestellt ist und der Text auf dem Button 'Light Mode' zeigt (Initialzustand)


  await userEvent.click(button);
  button = screen.getByText('🌙 Dark Mode');
  expect(button).toBeInTheDocument();
  expect(document.documentElement).toHaveClass('light');
  // testet, ob nach dem Klick Light Mode eingestellt ist und der Text auf dem Button 'Dark Mode' zeigt

  await userEvent.click(button);
  button = screen.getByText('☀️ Light Mode');
  expect(button).toBeInTheDocument();
  expect(document.documentElement).not.toHaveClass('light');
});

