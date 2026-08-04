export const categories = [
  { id: 1, slug: 'electronics', name: 'Electronics', icon: '🎧', image: 'https://picsum.photos/seed/cat-electronics/800/800' },
  { id: 2, slug: 'fashion', name: 'Fashion', icon: '👗', image: 'https://picsum.photos/seed/cat-fashion/800/800' },
  { id: 3, slug: 'home', name: 'Home & Living', icon: '🏺', image: 'https://picsum.photos/seed/cat-home/800/800' },
  { id: 4, slug: 'beauty', name: 'Beauty', icon: '💄', image: 'https://picsum.photos/seed/cat-beauty/800/800' },
  { id: 5, slug: 'sports', name: 'Sports & Fitness', icon: '🏋️', image: 'https://picsum.photos/seed/cat-sports/800/800' },
  { id: 6, slug: 'kids', name: 'Kids & Toys', icon: '🧸', image: 'https://picsum.photos/seed/cat-kids/800/800' },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
