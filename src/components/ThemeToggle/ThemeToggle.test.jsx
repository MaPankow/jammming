import ThemeToggle from './ThemeToggle';
import { render, screen, fireEvent } from '@testing-library/react';



it('switches text on click', () => {
  render (<ThemeToggle />);
  const button = screen.getByText('☀️ Light Mode');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  const darkButton = screen.getByText('🌙 Dark Mode');
  expect(darkButton).toBeInTheDocument();
});
// Test 1 beenden: zurück zu Light Mode switchen und wieder zu Dark Mode
// Test 2: Checkt den Wechsel zum Dark-Mode
// Zwei Tests dann in ein "describe" einwickeln, damit Fehler beim Testen besser gefunden werden können