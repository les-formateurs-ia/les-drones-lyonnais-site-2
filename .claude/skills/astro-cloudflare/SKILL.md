---
name: astro-cloudflare
description: Architecture and implementation rules for the Les Drones Lyonnais Astro website deployed through Cloudflare. Use for components, pages, routing, data architecture, performance, deployment, or frontend implementation decisions.
---

# Astro + Cloudflare Architecture

## Stack

The public website uses:

- Astro
- TypeScript
- Tailwind CSS
- Cloudflare
- GitHub

Stripe handles payments (shop and rental). Dynamic data (orders, bookings, availability) lives in Cloudflare D1 behind a Worker, never in the static pages.

## Default architecture

Prefer Astro components.

Do not introduce React unless actual client-side application behavior requires it.

Prefer:

- static generation
- server-rendered HTML where justified
- minimal JavaScript
- semantic HTML
- reusable Astro components
- TypeScript
- CSS-first solutions

## JavaScript

Client JavaScript is a cost.

Do not hydrate components without a clear reason.

Before adding JavaScript, check whether the feature can be implemented with:

1. HTML
2. CSS
3. native browser APIs
4. Astro

Only then consider client-side frameworks.

## Components

Prefer small focused components.

Examples:

- Header
- Hero
- CTA
- ProductCard
- RentalCard
- TrustSection
- LogoWall
- Testimonials
- FAQ
- Footer

Do not create abstractions before they are needed.

Do not reproduce Elementor component nesting.

## Data

Static presentation data may live in:

- Astro files
- content collections
- typed data files

Use a Cloudflare Worker + D1 only for data that is genuinely dynamic:

- orders
- rental bookings and availability
- stock

Payments always go through Stripe Checkout (test keys during development). Prices are
checked server side in the Worker, never trusted from the browser.

Do not use a database as a replacement for static HTML.

## Performance

Always consider:

- LCP
- CLS
- INP
- image optimization
- responsive images
- font loading
- unnecessary hydration
- JavaScript weight
- third-party scripts
- Cloudflare caching
