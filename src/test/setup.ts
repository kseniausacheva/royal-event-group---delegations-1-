import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up DOM after each test
afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

// Mock framer-motion to avoid animation complexity in tests.
// IMPORTANT: cache components per tag so Proxy access doesn't return a new
// component identity on every render (which would cause children to remount
// and break controlled inputs / lose focus mid-typing).
vi.mock('framer-motion', async () => {
  const React = await import('react');
  const MOTION_PROPS = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'variants',
    'whileHover',
    'whileTap',
    'whileInView',
    'whileFocus',
    'whileDrag',
    'viewport',
    'drag',
    'dragConstraints',
    'layout',
    'layoutId',
    'onAnimationStart',
    'onAnimationComplete',
    'onHoverStart',
    'onHoverEnd',
    'onTap',
    'onTapStart',
    'onTapCancel',
    'custom',
  ]);
  const stripMotionProps = (props: any) => {
    const cleaned: any = {};
    for (const k of Object.keys(props)) {
      if (!MOTION_PROPS.has(k)) cleaned[k] = props[k];
    }
    return cleaned;
  };
  const cache = new Map<string, any>();
  const make = (tag: string) => {
    if (cache.has(tag)) return cache.get(tag);
    const C = React.forwardRef(({ children, ...props }: any, ref: any) =>
      React.createElement(tag, { ...stripMotionProps(props), ref }, children)
    );
    (C as any).displayName = `motion.${tag}`;
    cache.set(tag, C);
    return C;
  };
  const motion: any = new Proxy(
    {},
    {
      get: (_t, prop: string) => make(prop),
    }
  );
  return {
    motion,
    AnimatePresence: ({ children }: any) => children,
    useScroll: () => ({
      scrollY: { get: () => 0, on: () => () => {} },
      scrollYProgress: { get: () => 0, on: () => () => {} },
    }),
    useTransform: (_v: any, _from: any, to: any) =>
      Array.isArray(to) ? to[0] : 0,
    useMotionValue: (initial: any) => ({
      get: () => initial,
      set: () => {},
      on: () => () => {},
    }),
    useSpring: (v: any) => v,
    useInView: () => true,
    useAnimation: () => ({ start: () => {}, stop: () => {}, set: () => {} }),
  };
});

// Mock window.scrollTo (jsdom doesn't implement it)
window.scrollTo = vi.fn() as any;

// IntersectionObserver mock
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];
}
(globalThis as any).IntersectionObserver = IntersectionObserverMock;
