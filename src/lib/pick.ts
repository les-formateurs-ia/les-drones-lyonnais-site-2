// Picks catalogue products by slug, in the given order (unknown slugs are skipped).
import { PRODUCTS, type Product } from '../data/catalog';

export const pick = (...slugs: string[]) => slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[];
