export const banners = [
  { id: 1, title: 'Season Edit', subtitle: 'Fresh drops for the new season', cta: 'Shop the edit', image: 'https://picsum.photos/seed/banner1/1800/900', enabled: true },
  { id: 2, title: 'Flash Sale', subtitle: 'Up to 50% off, today only', cta: 'Grab the deal', image: 'https://picsum.photos/seed/banner2/1800/900', enabled: true },
  { id: 3, title: 'New Arrivals', subtitle: 'The latest, first to your door', cta: 'Explore new-in', image: 'https://picsum.photos/seed/banner3/1800/900', enabled: true },
];

export const promoBanners = [
  { id: 1, tag: 'Limited Time', title: 'Up to 40% off Electronics', cta: 'Shop deals', link: '/category/electronics', image: 'https://picsum.photos/seed/promo1/700/400' },
  { id: 2, tag: 'Just Landed', title: 'New Season Fashion Edit', cta: 'Explore new-in', link: '/category/fashion', image: 'https://picsum.photos/seed/promo2/700/400' },
  { id: 3, tag: 'Member Perk', title: 'Extra 10% Off For Members', cta: 'Join free', link: '/register', image: 'https://picsum.photos/seed/promo3/700/400' },
];

// Starter brands — admins can replace these with real uploaded logos (or add
// more) from Admin → Brands. Logo starts blank so the name shows until one
// is uploaded.
export const brandsList = [
  { id: 1, name: 'Novara', logo: '', enabled: true },
  { id: 2, name: 'Auralite', logo: '', enabled: true },
  { id: 3, name: 'Kessho', logo: '', enabled: true },
  { id: 4, name: 'Fieldstone', logo: '', enabled: true },
  { id: 5, name: 'Marrow', logo: '', enabled: true },
  { id: 6, name: 'Lumen', logo: '', enabled: true },
];

export const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@novara.com', role: 'admin', status: 'active', joined: '2024-01-10' },
  { id: 2, name: 'Sara Khan', email: 'sara@example.com', role: 'customer', status: 'active', joined: '2024-03-22' },
  { id: 3, name: 'Bilal Ahmed', email: 'bilal@example.com', role: 'customer', status: 'blocked', joined: '2024-05-02' },
  { id: 4, name: 'Fatima Noor', email: 'fatima@example.com', role: 'customer', status: 'active', joined: '2024-06-18' },
  { id: 5, name: 'James Lee', email: 'james@example.com', role: 'customer', status: 'active', joined: '2024-07-01' },
];

const statuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
export const mockOrders = Array.from({ length: 14 }).map((_, i) => ({
  id: `ORD-${2400 + i}`,
  customer: mockUsers[(i % 4) + 1]?.name || 'Guest',
  date: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString(),
  total: Math.round((30 + Math.random() * 260) * 100) / 100,
  status: statuses[i % statuses.length],
  items: Math.floor(1 + Math.random() * 4),
}));
