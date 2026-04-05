import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../LanguageContext';
import { useLocalizedPath } from './useLocalizedPath';

/**
 * UNIT TESTS — useLocalizedPath
 * Tests a pure (hook) function in isolation: given a route prefix,
 * the returned function should produce correctly prefixed paths.
 */
describe('useLocalizedPath (unit)', () => {
  const wrapper = (initialPath: string) => {
    return ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={[initialPath]}>
        <LanguageProvider>{children}</LanguageProvider>
      </MemoryRouter>
    );
  };

  it('prefixes paths with /ru when on Russian route', () => {
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: wrapper('/ru'),
    });
    expect(result.current('/about')).toBe('/ru/about');
    expect(result.current('/contact')).toBe('/ru/contact');
  });

  it('prefixes paths with /en when on English route', () => {
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: wrapper('/en/services'),
    });
    expect(result.current('/about')).toBe('/en/about');
    expect(result.current('/portfolio')).toBe('/en/portfolio');
  });

  it('returns just the language root for "/"', () => {
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: wrapper('/ru'),
    });
    expect(result.current('/')).toBe('/ru');
  });

  it('handles nested paths correctly', () => {
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: wrapper('/en'),
    });
    expect(result.current('/portfolio/case-1')).toBe('/en/portfolio/case-1');
    expect(result.current('/blog/trends-2026')).toBe('/en/blog/trends-2026');
  });

  it('defaults to ru for unknown/root paths', () => {
    const { result } = renderHook(() => useLocalizedPath(), {
      wrapper: wrapper('/unknown'),
    });
    expect(result.current('/about')).toBe('/ru/about');
  });
});
