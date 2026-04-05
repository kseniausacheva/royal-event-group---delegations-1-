import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../LanguageContext';
import ContactForm from './ContactForm';

/**
 * INTEGRATION TESTS — ContactForm
 * Tests form interactions, validation, and submission flow with a mocked fetch.
 */
const renderForm = (path = '/ru') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <ContactForm />
      </LanguageProvider>
    </MemoryRouter>
  );

describe('ContactForm (integration)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders name, email, message fields and required checkboxes', () => {
    renderForm('/ru');
    // The form has text input, email input, and a textarea
    expect(document.querySelector('input[type="text"]')).toBeInTheDocument();
    expect(document.querySelector('input[type="email"]')).toBeInTheDocument();
    expect(document.querySelector('textarea')).toBeInTheDocument();
    // Required consent checkboxes (data-consent & offer-consent are required; mailing is optional)
    const dataConsent = document.getElementById('data-consent') as HTMLInputElement;
    const offerConsent = document.getElementById('offer-consent') as HTMLInputElement;
    const mailingConsent = document.getElementById('mailing-consent') as HTMLInputElement;
    expect(dataConsent).toBeInTheDocument();
    expect(dataConsent.required).toBe(true);
    expect(offerConsent.required).toBe(true);
    expect(mailingConsent.required).toBe(false);
  });

  it('submits the form and shows success message on 200 response', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    renderForm('/ru');

    // Fill fields — inputs don't have accessible labels via htmlFor, so grab by tag
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
    const [nameInput, emailInput, messageInput] = inputs as unknown as HTMLInputElement[];

    await user.type(nameInput, 'Ksenia');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageInput, 'Hello from tests');

    (document.getElementById('data-consent') as HTMLInputElement).checked = true;
    (document.getElementById('offer-consent') as HTMLInputElement).checked = true;

    const form = document.querySelector('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({
      name: 'Ksenia',
      email: 'test@example.com',
      message: 'Hello from tests',
      mailingConsent: false,
    });

    await waitFor(() => {
      expect(screen.getByText(/заявка отправлена/i)).toBeInTheDocument();
    });
  });

  it('shows error message on network failure', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    vi.stubGlobal('fetch', fetchMock);

    renderForm('/ru');
    const form = document.querySelector('form')!;
    const [nameInput, emailInput, messageInput] = document.querySelectorAll(
      'input[type="text"], input[type="email"], textarea'
    ) as any;
    nameInput.value = 'A';
    emailInput.value = 'a@a.com';
    messageInput.value = 'Test';
    fireEvent.input(nameInput);
    fireEvent.input(emailInput);
    fireEvent.input(messageInput);

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/ошибка/i)).toBeInTheDocument();
    });
  });

  it('renders English labels on /en route', () => {
    renderForm('/en');
    // English consent labels — multiple checkboxes share "I give my" text
    expect(screen.getAllByText(/I give my/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/public offer/i)).toBeInTheDocument();
  });
});
