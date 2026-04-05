import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import AppRoutes + Navbar via the app module's named re-render approach.
// Since App.tsx wraps everything in BrowserRouter, we mount the inner content
// with a MemoryRouter to control navigation.
import { LanguageProvider } from '../../LanguageContext';

// We need to replicate the structure without BrowserRouter. Easiest: import App
// but we cannot swap Router. Instead, re-create a tiny harness that mounts the
// same routes + navbar using the same imports.
import Home from '../../pages/Home';
import About from '../../pages/About';
import Services from '../../pages/Services';
import Portfolio from '../../pages/Portfolio';
import Contact from '../../pages/Contact';
import Delegations from '../../pages/Delegations';
import BlogPage from '../../pages/BlogPage';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import MailingConsent from '../../pages/MailingConsent';
import DataConsent from '../../pages/DataConsent';
import Offer from '../../pages/Offer';
import NotFound from '../../pages/NotFound';
import CookieBanner from '../../components/CookieBanner';
import Footer from '../../components/Footer';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../LanguageContext';

/**
 * END-TO-END TESTS — Full user flows
 *
 * These tests simulate real user scenarios across the whole app:
 *  - navigating between pages via clicks on the navbar
 *  - switching language via the RU/EN toggle
 *  - submitting the contact form (mocked network)
 *  - hitting an unknown URL -> 404 page
 *  - accepting the cookie banner and persisting the choice
 *
 * The app is mounted with a MemoryRouter so we can drive navigation
 * without a real browser.
 */

// Minimal Navbar copy sufficient to drive navigation in tests.
const TestNavbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const langPrefix = `/${language}`;
  const navLinks = [
    { name: t.nav.home, path: `${langPrefix}` },
    { name: t.nav.about, path: `${langPrefix}/about` },
    { name: t.nav.services, path: `${langPrefix}/services` },
    { name: t.nav.contact, path: `${langPrefix}/contact` },
  ];
  return (
    <nav>
      {navLinks.map((l) => (
        <Link key={l.path} to={l.path} data-testid={`nav-${l.name}`}>
          {l.name}
        </Link>
      ))}
      <button onClick={() => setLanguage('ru')} data-testid="lang-ru">RU</button>
      <button onClick={() => setLanguage('en')} data-testid="lang-en">EN</button>
      <span data-testid="current-path">{location.pathname}</span>
    </nav>
  );
};

const TestRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/ru" replace />} />
    <Route path="/ru" element={<Home />} />
    <Route path="/ru/about" element={<About />} />
    <Route path="/ru/services" element={<Services />} />
    <Route path="/ru/portfolio" element={<Portfolio />} />
    <Route path="/ru/delegations" element={<Delegations />} />
    <Route path="/ru/blog" element={<BlogPage />} />
    <Route path="/ru/contact" element={<Contact />} />
    <Route path="/ru/privacy" element={<PrivacyPolicy />} />
    <Route path="/ru/mailing-consent" element={<MailingConsent />} />
    <Route path="/ru/data-consent" element={<DataConsent />} />
    <Route path="/ru/offer" element={<Offer />} />
    <Route path="/en" element={<Home />} />
    <Route path="/en/about" element={<About />} />
    <Route path="/en/services" element={<Services />} />
    <Route path="/en/contact" element={<Contact />} />
    <Route path="/ru/*" element={<NotFound />} />
    <Route path="/en/*" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/ru" replace />} />
  </Routes>
);

const renderApp = (initialPath = '/ru') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <LanguageProvider>
          <TestNavbar />
          <TestRoutes />
          <Footer />
          <CookieBanner />
        </LanguageProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe('E2E — Navigation flows', () => {
  it('user lands on home and sees cookie banner on first visit', async () => {
    renderApp('/ru');
    await waitFor(() => {
      expect(screen.getByText(/cookie/i)).toBeInTheDocument();
    });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/ru');
  });

  it('user navigates from home to About via nav click', async () => {
    const user = userEvent.setup();
    renderApp('/ru');
    const aboutLink = screen.getAllByRole('link').find((l) =>
      l.getAttribute('href') === '/ru/about'
    )!;
    await user.click(aboutLink);
    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/ru/about');
    });
  });

  it('user switches language from RU to EN and URL prefix updates', async () => {
    const user = userEvent.setup();
    renderApp('/ru/about');
    await user.click(screen.getByTestId('lang-en'));
    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/en/about');
    });
  });

  it('user visiting an unknown URL sees the 404 page', async () => {
    renderApp('/ru/this-page-does-not-exist');
    await waitFor(() => {
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
    });
  });

  it('user visiting unknown EN URL sees English 404', async () => {
    renderApp('/en/nope');
    await waitFor(() => {
      expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    });
  });

  it('root "/" redirects user to /ru', async () => {
    renderApp('/');
    await waitFor(() => {
      expect(screen.getByTestId('current-path')).toHaveTextContent('/ru');
    });
  });
});

describe('E2E — Cookie consent flow', () => {
  it('user accepts cookies, banner disappears and preference persists', async () => {
    const user = userEvent.setup();
    renderApp('/ru');
    const acceptBtn = await screen.findByRole('button', { name: /согласен/i });
    await user.click(acceptBtn);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /согласен/i })).not.toBeInTheDocument();
    });
    expect(localStorage.getItem('cookie-consent')).toBe('true');
  });
});

describe('E2E — Contact form submission flow', () => {
  it('user fills contact form and submits successfully', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderApp('/ru/contact');

    // Find the first form on the page (contact form)
    const form = document.querySelector('form')!;
    expect(form).toBeTruthy();

    const nameInput = form.querySelector('input[type="text"]') as HTMLInputElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    const messageInput = form.querySelector('textarea') as HTMLTextAreaElement;

    await user.type(nameInput, 'Иван Иванов');
    await user.type(emailInput, 'ivan@example.com');
    await user.type(messageInput, 'Хочу организовать мероприятие');

    // Tick required checkboxes
    (document.getElementById('data-consent') as HTMLInputElement).checked = true;
    (document.getElementById('offer-consent') as HTMLInputElement).checked = true;

    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.any(Object));
    });

    await waitFor(() => {
      expect(screen.getByText(/заявка отправлена/i)).toBeInTheDocument();
    });
  });
});
