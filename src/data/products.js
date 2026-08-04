import { categories } from './categories';

const img = (seed, w = 900, h = 900) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const names = {
  electronics: ['Wireless Earbuds Pro', 'Smart Watch Series 5', '4K Action Camera', 'Bluetooth Speaker Max', 'Noise Cancelling Headset', '65W Fast Charger', 'Mechanical Keyboard', 'Gaming Mouse RGB', 'Portable SSD 1TB', 'Smart LED Bulb Kit'],
  fashion: ['Oversized Denim Jacket', 'Linen Summer Shirt', 'Classic Chino Trousers', 'Knit Pullover', 'Leather Ankle Boots', 'Structured Tote Bag', 'Aviator Sunglasses', 'Silk Scarf', 'Wool Blend Coat', 'Everyday Sneakers'],
  home: ['Ceramic Vase Set', 'Linen Throw Pillow', 'Minimalist Wall Clock', 'Bamboo Cutting Board', 'Scented Soy Candle', 'Woven Storage Basket', 'Glass Pour-Over Kettle', 'Cotton Bed Sheet Set', 'Table Lamp Warm Oak', 'Cast Iron Skillet'],
  beauty: ['Vitamin C Serum', 'Matte Lipstick Duo', 'Hydrating Face Cream', 'Argan Hair Oil', 'Mineral Sunscreen SPF50', 'Rose Water Toner', 'Bamboo Makeup Brush Set', 'Charcoal Face Mask', 'Nail Polish Trio', 'Body Butter Whip'],
  sports: ['Yoga Mat Pro', 'Adjustable Dumbbell Set', 'Running Shoes Air', 'Resistance Bands Kit', 'Insulated Water Bottle', 'Cycling Helmet', 'Foam Roller', 'Gym Duffel Bag', 'Compression Leggings', 'Jump Rope Speed'],
  kids: ['Wooden Building Blocks', 'Plush Bunny Toy', 'Kids Backpack Dino', 'Puzzle Set 100pc', 'Colorful Rain Boots', 'Storybook Collection', 'Toy Race Car Set', 'Kids Water Bottle', 'Art & Craft Kit', 'Soft Play Mat'],
};

const brands = ['Novara', 'Auralite', 'Kessho', 'Fieldstone', 'Marrow', 'Lumen'];

function makeProducts() {
  let id = 1;
  const list = [];
  categories.forEach((cat) => {
    const catNames = names[cat.slug] || names.electronics;
    catNames.forEach((name, i) => {
      const price = Math.round((20 + Math.random() * 180) * 100) / 100;
      const hasDiscount = Math.random() > 0.5;
      const discountPrice = hasDiscount ? Math.round(price * (0.6 + Math.random() * 0.3) * 100) / 100 : null;
      const stock = Math.random() > 0.15 ? Math.floor(Math.random() * 60) : 0;
      list.push({
        id: id,
        slug: `${cat.slug}-${id}`,
        name,
        category: cat.slug,
        categoryName: cat.name,
        brand: brands[id % brands.length],
        price,
        discountPrice,
        rating: Math.round((3.2 + Math.random() * 1.8) * 10) / 10,
        reviewCount: Math.floor(20 + Math.random() * 480),
        stock,
        images: [img(`${cat.slug}-${id}-a`), img(`${cat.slug}-${id}-b`), img(`${cat.slug}-${id}-c`)],
        description: `The ${name} blends everyday practicality with a considered design. Built with quality materials and finished with attention to detail, it's made to earn a permanent place in your routine.`,
        specifications: {
          Brand: brands[id % brands.length],
          Category: cat.name,
          Warranty: '12 Months',
          SKU: `NV-${1000 + id}`,
        },
        isFeatured: Math.random() > 0.7,
        isTrending: Math.random() > 0.72,
        isBestSeller: Math.random() > 0.75,
        isNewArrival: i < 3,
        createdAt: Date.now() - Math.floor(Math.random() * 1e10),
      });
      id++;
    });
  });
  return list;
}

export const products = makeProducts();

export const getProductById = (id) => products.find((p) => String(p.id) === String(id));
export const getProductsByCategory = (slug) => products.filter((p) => p.category === slug);
export const getRelatedProducts = (product, count = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
