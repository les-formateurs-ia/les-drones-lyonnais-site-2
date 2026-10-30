---
name: visual-qa
description: Visual quality assurance workflow for the Les Drones Lyonnais website. Use after implementing or significantly modifying frontend UI.
---

# Visual QA

Frontend work is not complete when the code compiles.

Always inspect important UI in a real browser.

## Test viewports

At minimum review:

- desktop
- tablet
- mobile

## Review

Check:

- hierarchy
- typography
- spacing
- alignment
- section rhythm
- wrapping
- overflow
- image cropping
- navigation
- responsive transitions
- hover states
- focus states
- interactive feedback
- animation quality
- reduced motion behavior

## Process

1. implement
2. run locally
3. open in browser
4. capture screenshots when useful
5. identify visible problems
6. correct them
7. inspect again

Use Playwright when available.

Never assume technically correct code produces visually correct output.
