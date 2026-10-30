---
name: ldl-art-direction
description: Art direction and visual identity rules for the Les Drones Lyonnais website. Use when designing or reviewing pages, sections, visual hierarchy, typography, layout, imagery, branding, or overall aesthetic direction.
---

# Les Drones Lyonnais — Art direction

The identity comes from the brand's existing assets, refined — not from a template.

## Foundations

- **Black and white photography.** Photos are stored in colour and shown in grayscale
  (`filter: grayscale(1)`). Colour comes back only when the visitor points at or focuses
  an activity. Colour is a reward for interaction, never decoration.
- **Gold line.** `--color-gold` (#af854a), from the logo, is used for rules, focus rings
  and the main CTA on black. Text in gold on white uses `--color-gold-deep` (contrast).
- **The LDL square.** The point of the LDL monogram, coloured per activity, marks what a
  link or section belongs to:
  - Prestations `#0835bd` (blue)
  - Formations `#296321` (green)
  - Location `#e25d02` (orange)
  - Boutique black (white on dark backgrounds)
  Use the `Square` component; never use these colours as large fills or gradients.
- **True black and white.** `#000` and `#fff`, one quiet grey (`--color-mist`) for
  alternating sections. No cream, no tinted near-black.

## Shared building blocks (keep the page coherent)

- `SectionHeader` (components/ui): LDL square + title + intro, same grid and size for
  every section. Section titles: clamp(2.1rem, 4vw, 3.4rem).
- `section-pad` utility: the vertical rhythm of every section.
- `viewfinder` utility: the drone camera's corner marks around any framed picture
  (hero, services screen, portraits, map). Set `--vf` to ink on light backgrounds.
- `hud-text` utility: condensed cut for data labels (flight data, sensors, captions,
  skills).
- Two backgrounds only: ink and paper. Colour photos are "in focus"; at rest, photos
  of people are black and white.

## Typography

One family: Archivo variable (weight 100–900, width 62–125%).

- Titles: `display` utility — width 125%, bold, tight tracking, sentence case.
- Sub-titles: width ~112%, bold.
- Reading text: normal width, 16–18px, line length under ~70 characters.
- No all-caps labels, no eyebrows above headings, no single highlighted word.

## Layout

- The homepage triptych (Prestations | Boutique + Location | Formations) is the brand's
  signature: keep it as the entry point to the four activities.
- Left-aligned text, 12-column grid, generous section padding (64–96px).
- Lists of links are editorial rows with hairlines, not card grids.
- Square corners. No shadows, glows, blobs or gradient backgrounds.

## Imagery

- Real photos of the team, the gear and the missions. No stock, no generic AI imagery.
- Pop (the team's samoyed) is the mascot and the site's assistant: the chat button on
  every page, and PopTip bubbles where a visitor may hesitate (choosing a drone,
  regulation, rental, financing). Use the pose that fits the message (src/assets/pop/:
  permis-*, pilote, livraison, manuel, loupe, support, chantier, pouce, coucou…).
  One or two tips per page, never decoration for its own sake.

## Motion

- One meaningful interaction per area (triptych: widen + colour back). Short, ease-out.
- Always respect `prefers-reduced-motion`.
