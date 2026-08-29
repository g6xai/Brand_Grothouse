/**
 * Grothouse Design System — React primitives (Apple HIG)
 *
 * Canonical standard: DriveX design/APPLE-HIG-STANDARD.md
 * Local deltas:       docs/APPLE-HIG-STANDARD.md
 *
 * Requires kit/grothouse-system.css imported globally. These are thin
 * wrappers over the CSS layer, not a component library — they exist so a
 * consumer cannot accidentally re-derive the token values in JS.
 *
 *   <ThemeProvider entity="grothouse_family" theme="light">
 *     <Container>
 *       <Display>Built on Faith.</Display>
 *       <Body>Driven by Purpose.</Body>
 *     </Container>
 *   </ThemeProvider>
 */

import React, { createContext, useContext, useEffect } from 'react';
// tokens.json sits one level up. The previous version imported './tokens.json'
// from inside kit/react/, which does not exist — this file could never have
// been imported successfully.
import tokens from '../tokens.json';

const ThemeCtx = createContext(null);

export function useEntity() {
  return useContext(ThemeCtx);
}

export function useEntityCatalog() {
  return tokens.entities;
}

/**
 * Sets [data-entity], [data-accent] and [data-theme] on <html>. The accent is
 * read from the entity, never passed in: one accent per surface is the whole
 * colour law, and letting a caller override it is how a third accent appears.
 */
export function ThemeProvider({ entity = 'grothouse_family', theme = 'light', children }) {
  const ent = tokens.entities.find((e) => e.id === entity) || tokens.entities[0];

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-entity', ent.id);
    root.setAttribute('data-accent', ent.accent);
    root.setAttribute('data-theme', theme);
  }, [ent.id, ent.accent, theme]);

  return <ThemeCtx.Provider value={{ entity: ent, theme }}>{children}</ThemeCtx.Provider>;
}

/* ----------------------------------------------------------- typography -- */

const cx = (...parts) => parts.filter(Boolean).join(' ');

export const Display = ({ as: Tag = 'h1', className, ...p }) => (
  <Tag className={cx('hig-display', className)} {...p} />
);
export const Title1 = ({ as: Tag = 'h2', className, ...p }) => (
  <Tag className={cx('hig-title-1', className)} {...p} />
);
export const Title2 = ({ as: Tag = 'h3', className, ...p }) => (
  <Tag className={cx('hig-title-2', className)} {...p} />
);
export const Body = ({ as: Tag = 'p', className, ...p }) => (
  <Tag className={cx('hig-body', className)} {...p} />
);
export const Caption = ({ as: Tag = 'p', className, ...p }) => (
  <Tag className={cx('hig-caption', className)} {...p} />
);

/**
 * Machine identifiers only — NMLS numbers, loan IDs, hash digests, API key
 * prefixes. Character alignment has to carry meaning. This is the one
 * surviving monospace and it is not a decorative treatment.
 */
export const Identifier = ({ className, ...p }) => (
  <span className={cx('font-id', className)} {...p} />
);

/* -------------------------------------------------------------- surfaces -- */

export const Card = ({ className, ...p }) => <div className={cx('hig-card', className)} {...p} />;
export const Container = ({ className, ...p }) => (
  <div className={cx('hig-container', className)} {...p} />
);
export const Section = ({ className, ...p }) => (
  <section className={cx('hig-section', className)} {...p} />
);
export const Stack = ({ className, ...p }) => <div className={cx('hig-stack', className)} {...p} />;
export const Separator = (p) => <hr className="hig-separator" {...p} />;

/** Translucency + backdrop blur. This is what replaced the radiance layer. */
export const Material = ({ className, ...p }) => (
  <div className={cx('hig-material', className)} {...p} />
);

/* -------------------------------------------------------------- controls -- */

export function Button({ variant = 'primary', className, type = 'button', ...p }) {
  return <button type={type} className={cx('hig-button', `hig-button-${variant}`, className)} {...p} />;
}

export const Input = ({ className, ...p }) => (
  <input className={cx('hig-input', className)} {...p} />
);

/* ---------------------------------------------------------------- states -- */

/** Empty states are designed, never a blank region. */
export function EmptyState({ title, body, action }) {
  return (
    <div className="hig-empty">
      <Title2>{title}</Title2>
      {body && <Body>{body}</Body>}
      {action}
    </div>
  );
}

/** Skeletons match the real layout. Never a bare spinner. */
export const Skeleton = ({ className, style, ...p }) => (
  <div className={cx('hig-skeleton', className)} style={style} aria-hidden="true" {...p} />
);

/* -------------------------------------------------------------- carousel -- */

/**
 * A sanctioned horizontal scroller. apple.com's iPhone page ships five on
 * mobile, so horizontal scroll is not the defect — unintentional horizontal
 * scroll is.
 *
 * Only for a PEER SET: comparable cards, never one record split across
 * columns. A data table is never a carousel — tabular data goes to a list
 * below 768px and a table above it.
 */
export const Carousel = ({ className, ...p }) => (
  <div className={cx('hig-carousel', className)} {...p} />
);

export { tokens };

export default {
  ThemeProvider,
  useEntity,
  useEntityCatalog,
  Display,
  Title1,
  Title2,
  Body,
  Caption,
  Identifier,
  Card,
  Container,
  Section,
  Stack,
  Separator,
  Material,
  Button,
  Input,
  EmptyState,
  Skeleton,
  Carousel,
  tokens,
};
