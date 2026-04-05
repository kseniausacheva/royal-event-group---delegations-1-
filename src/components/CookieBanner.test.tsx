import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../LanguageContext';
import CookieBanner from './CookieBanner';

/**
 * INTEGRATION TESTS — CookieBanner
 * Tests interaction between the component, LanguageContext, and localStorage.
 */
const renderBanner = (path = '/ru') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <CookieBanner />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('CookieBanner (integration)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the banner when no consent is stored', () => {
    renderBanner('/ru');
    expect(screen.getByText(/cookie/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /согласен/i })).toBeInTheDocument();
  });

  it('does not show the banner if consent already stored', () => {
    localStorage.setItem('cookie-consent', 'true');
    renderBanner('/ru');
    expect(screen.queryByRole('button', { name: /согласен/i })).not.toBeInTheDocument();
  });

  it('stores consent and hides banner on accept click', () => {
    renderBanner('/ru');
    const btn = screen.getByRole('button', { name: /согласен/i });
    fireEvent.click(btn);
    expect(localStorage.getItem('cookie-consent')).toBe('true');
    expect(screen.queryByRole('button', { name: /согласен/i })).not.toBeInTheDocument();
  });

  it('renders English copy on /en route', () => {
    renderBanner('/en');
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
  });
});
