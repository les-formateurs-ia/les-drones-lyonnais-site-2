---
name: seo-production
description: Production SEO rules for rebuilding and migrating lesdroneslyonnais.com from WordPress to Astro. Use when creating pages, changing URLs, metadata, structured data, internal links, content architecture, performance, or migration behavior.
---

# Les Drones Lyonnais — Production SEO

## Context

The website is being migrated from:

- WordPress
- Elementor
- WooCommerce (153 products, WooCommerce Bookings for rental)

to:

- Astro
- TypeScript
- Cloudflare

The existing site already has indexed URLs and SEO value.

SEO continuity is critical.

## Never break URLs silently

Before changing an existing public URL:

1. check whether the URL exists on the current website
2. determine whether it may be indexed
3. preserve it whenever reasonable
4. otherwise implement a permanent 301 redirect

Do not casually rename slugs.

## Every indexable page

Check:

- title
- meta description
- canonical
- unique H1
- logical H2/H3 hierarchy
- semantic HTML
- OpenGraph
- social metadata
- internal linking
- image alt text
- structured data when relevant
- crawlability
- indexability

## Migration

Preserve useful:

- indexed URLs
- metadata
- internal links
- PDFs
- downloadable documents
- structured data
- meaningful page content

Do not copy WordPress technical structures.

Do not migrate:

- Elementor markup
- wp_posts architecture
- wp_postmeta architecture
- plugin-specific database structures
- WooCommerce product/category URL patterns without checking redirects (/produit/, /categorie-produit/)

## Content

Write for humans first.

Avoid:

- keyword stuffing
- repetitive city names
- generic AI-generated SEO paragraphs
- fake expertise
- filler content

Content should demonstrate actual subject expertise.

## Technical SEO

Always consider:

- sitemap
- robots.txt
- canonicals
- redirects
- structured data
- Core Web Vitals
- image optimization
- mobile rendering
- accessibility
- page speed
- internal architecture
