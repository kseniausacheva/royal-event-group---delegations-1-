import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../LanguageContext';
import Footer from './Footer';

/**
 * INTEGRATION TESTS — Footer
 * Verifies Footer integrates with LanguageContext and renders the legal info,
 * social links, and legal links (privacy, data-consent, mailing-consent, offer).
 */
const renderFooter = (path = '/ru') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('Footer (integration)', () => {
  it('renders social links with aria-labels', () => {
    renderFooter('/ru');
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Telegram')).toBeInTheDocument();
  });

  it('contains ИНН number in legal info (ru)', () => {
    renderFooter('/ru');
    expect(screen.getByText(/772206846997/)).toBeInTheDocument();
  });

  it('renders legal navigation links with /ru prefix', () => {
    renderFooter('/ru');
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining([expect.stringContaining('/ru/privacy')]));
    expect(hrefs).toEqual(expect.arrayContaining([expect.stringContaining('/ru/offer')]));
    expect(hrefs).toEqual(expect.arrayContaining([expect.stringContaining('/ru/data-consent')]));
    expect(hrefs).toEqual(expect.arrayContaining([expect.stringContaining('/ru/mailing-consent')]));
  });

  it('switches legal link prefixes to /en on English route', () => {
    renderFooter('/en');
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toEqual(expect.arrayContaining([expect.stringContaining('/en/privacy')]));
    expect(hrefs).toEqual(expect.arrayContaining([expect.stringContaining('/en/offer')]));
  });
});
