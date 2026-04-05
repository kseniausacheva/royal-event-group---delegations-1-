import { describe, it, expect } from 'vitest';
import { translations } from './translations';

/**
 * UNIT TESTS — translations structure
 * Validates the shape of the translations object in isolation.
 * Ensures parity between RU and EN locales so no keys are missing.
 */
describe('translations (unit)', () => {
  it('exports both ru and en locales', () => {
    expect(translations.ru).toBeDefined();
    expect(translations.en).toBeDefined();
  });

  it('has matching top-level keys across ru and en', () => {
    const ruKeys = Object.keys(translations.ru).sort();
    const enKeys = Object.keys(translations.en).sort();
    expect(enKeys).toEqual(ruKeys);
  });

  it('contains required navigation entries', () => {
    const requiredNav = [
      'home',
      'about',
      'services',
      'portfolio',
      'delegations',
      'egypt',
      'uae',
      'russia',
      'blog',
      'contact',
    ];
    for (const key of requiredNav) {
      expect(translations.ru.nav).toHaveProperty(key);
      expect(translations.en.nav).toHaveProperty(key);
      expect(typeof (translations.ru.nav as any)[key]).toBe('string');
      expect(typeof (translations.en.nav as any)[key]).toBe('string');
    }
  });

  it('has destinations block for egypt, uae, russia in both locales', () => {
    for (const lang of ['ru', 'en'] as const) {
      expect(translations[lang].destinations).toHaveProperty('egypt');
      expect(translations[lang].destinations).toHaveProperty('uae');
      expect(translations[lang].destinations).toHaveProperty('russia');
    }
  });

  it('array shapes match between ru and en for keys consumed by Home.tsx', () => {
    // Home.tsx calls .map() on these arrays — they MUST exist in both locales
    // with matching length, otherwise the English page crashes.
    const arrayKeys = [
      'hero.stats',
      'servicesOverview.items',
      'production.items',
      'cases.items',
      'videos.items',
      'team.ceos',
      'whyUs.items',
      'accessibleSection.cards',
      'locations.items',
      'philosophy.items',
    ];
    const get = (o: any, p: string) => p.split('.').reduce((a, k) => a?.[k], o);
    for (const key of arrayKeys) {
      const ru = get(translations.ru, key);
      const en = get(translations.en, key);
      expect(Array.isArray(ru), `${key} should be an array in ru`).toBe(true);
      expect(Array.isArray(en), `${key} should be an array in en`).toBe(true);
      expect(en.length, `${key}: en length should match ru`).toBe(ru.length);
    }
  });

  it('has no empty string values in nav', () => {
    for (const lang of ['ru', 'en'] as const) {
      for (const [k, v] of Object.entries(translations[lang].nav)) {
        expect(v, `${lang}.nav.${k} should not be empty`).toBeTruthy();
      }
    }
  });
});
