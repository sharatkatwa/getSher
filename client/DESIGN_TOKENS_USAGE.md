# Design Tokens Usage Guide

This frontend uses Tailwind CSS v4 tokens defined in:

```text
client/src/index.css
```

The tokens are based on the provided light and dark cricket design systems.

## Theme Modes

Light mode is the default.

To enable dark mode, add the `dark` class to a parent element:

```html
<html class="dark">
```

or in React:

```jsx
<div className="dark">
  <App />
</div>
```

All semantic token classes automatically change when inside `.dark`.

## Core Color Tokens

Use semantic colors instead of hard-coded Tailwind colors.

```jsx
<div className="bg-background text-on-background">
  Page content
</div>
```

Common classes:

```text
bg-background
text-on-background

bg-surface
bg-surface-container
bg-surface-container-low
bg-surface-container-high
bg-surface-container-highest
text-on-surface
text-on-surface-variant

bg-primary
text-primary
text-on-primary
bg-primary-container
text-on-primary-container

bg-secondary
text-secondary
text-on-secondary
bg-secondary-container

bg-tertiary
text-tertiary
bg-tertiary-container

bg-error
text-error
text-on-error

border-outline
border-outline-variant

bg-live
text-live
bg-success
text-success
bg-warning
text-warning
```

## Typography Tokens

Use these utilities for consistent type styles:

```text
text-display-lg
text-headline-lg
text-headline-lg-mobile
text-title-md
text-score-md
text-body-lg
text-body-md
text-body-sm
text-label-data
text-label-caps
```

Example:

```jsx
<article>
  <p className="text-label-caps text-live">Live</p>
  <h1 className="text-headline-lg text-on-surface">India vs Australia</h1>
  <p className="text-score-md text-primary">182/4</p>
  <p className="text-body-sm text-on-surface-variant">18.2 overs</p>
</article>
```

## Spacing Tokens

The design system exposes spacing utilities:

```text
p-xs
p-sm
p-md
p-lg
p-xl
gap-xs
gap-sm
gap-md
gap-lg
gap-xl
px-gutter
mx-margin-mobile
mx-margin-desktop
```

Example:

```jsx
<section className="p-lg">
  <div className="grid gap-md">...</div>
</section>
```

## Radius Tokens

Use the normal Tailwind radius utilities. They are mapped to design values:

```text
rounded-sm
rounded-md
rounded-lg
rounded-xl
rounded-full
```

Example:

```jsx
<button className="rounded-md bg-primary px-md py-sm text-on-primary">
  Follow Match
</button>
```

## Shadow Tokens

Available shadows:

```text
shadow-card
shadow-floating
```

Example:

```jsx
<div className="rounded-lg bg-surface-container-lowest p-lg shadow-card">
  Match card
</div>
```

## Layout Helper

Use `page-shell` to center page content with the correct max width and side margins:

```jsx
<main className="page-shell py-lg">
  Content
</main>
```

## Overlay Helper

Use `overlay-backdrop` for modals or drawers:

```jsx
<div className="fixed inset-0 overlay-backdrop">
  <div className="bg-surface-container-high rounded-lg p-lg">
    Modal content
  </div>
</div>
```

## Common Components

### Page Wrapper

```jsx
const Page = () => {
  return (
    <main className="min-h-screen bg-background text-on-background">
      <div className="page-shell py-lg">
        Page content
      </div>
    </main>
  );
};
```

### Match Card

```jsx
const MatchCard = () => {
  return (
    <article className="rounded-lg bg-surface-container-lowest p-lg shadow-card">
      <div className="mb-md flex items-center justify-between">
        <p className="text-label-caps text-live">Live</p>
        <p className="text-label-data text-on-surface-variant">T20</p>
      </div>

      <h2 className="text-title-md text-on-surface">India vs Australia</h2>
      <p className="mt-sm text-score-md text-primary">182/4</p>
      <p className="mt-xs text-body-sm text-on-surface-variant">18.2 overs</p>
    </article>
  );
};
```

### Primary Button

```jsx
<button className="rounded-md bg-primary px-md py-sm text-body-md font-semibold text-on-primary">
  View Details
</button>
```

### Secondary Button

```jsx
<button className="rounded-md border border-outline px-md py-sm text-body-md font-semibold text-primary">
  Scorecard
</button>
```

### Live Pill

```jsx
<span className="inline-flex items-center rounded-full bg-live px-sm py-xs text-label-caps text-on-secondary">
  Live
</span>
```

### Data Chip

```jsx
<span className="rounded-full bg-primary-container px-sm py-xs text-label-data text-on-primary-container">
  ODI
</span>
```

### Input

```jsx
<input
  className="rounded-md border border-outline bg-surface px-md py-sm text-body-md text-on-surface outline-none focus:border-primary"
  placeholder="Search players"
/>
```

## Recommended Usage Rules

- Prefer semantic classes like `bg-surface-container` over raw colors like `bg-slate-800`.
- Use `text-score-md` or `text-label-data` for scores, overs, strike rates, and statistics.
- Use `text-label-caps` for metadata such as `LIVE`, `ODI`, `VENUE`, and `RR`.
- Use `bg-live` only for live match status or urgent real-time indicators.
- Use `page-shell` for top-level page layout.
- Use `shadow-card` for cards and `shadow-floating` for modals, floating panels, or snackbars.
- Avoid hard-coded hex colors in components unless a new token is intentionally being added.

