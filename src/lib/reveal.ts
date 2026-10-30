// Reveals [data-reveal] elements once, when they enter the viewport.
// The `js` class (set inline in the <head>) gates the hidden state in CSS,
// so without JavaScript everything is visible.
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      io.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -12% 0px' },
);

document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
