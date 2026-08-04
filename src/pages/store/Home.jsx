import { useSelector } from 'react-redux';
import HeroSlider from '../../components/home/HeroSlider';
import CategoryCard from '../../components/home/CategoryCard';
import FlashSale from '../../components/home/FlashSale';
import ProductSection from '../../components/home/ProductSection';
import { PromoBanners, FeaturedBrands, CustomerReviews } from '../../components/home/ExtraSections';
import Reveal from '../../components/common/Reveal';

export default function Home() {
  const products = useSelector((s) => s.catalog.products);
  const categories = useSelector((s) => s.catalog.categories);

  const trending = products.filter((p) => p.isTrending);
  const bestSelling = products.filter((p) => p.isBestSeller);
  const newArrivals = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
  const featuredCats = categories;
  const flashSale = products.filter((p) => p.discountPrice);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <HeroSlider />
      </div>

      <Reveal><PromoBanners /></Reveal>

      <Reveal>
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-5">Shop by Category</h2>
          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-2 sm:grid sm:grid-cols-6 sm:overflow-visible sm:justify-items-center">
            {featuredCats.map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </section>
      </Reveal>

      <Reveal><FlashSale products={flashSale} /></Reveal>
      <Reveal><ProductSection title="Trending Products" subtitle="What everyone's adding to cart" products={trending} viewAllLink="/search?filter=trending" /></Reveal>
      <Reveal><ProductSection title="Best Selling" subtitle="Proven favorites" products={bestSelling} viewAllLink="/search?filter=bestseller" /></Reveal>
      <Reveal><ProductSection title="New Arrivals" subtitle="Just landed" products={newArrivals} viewAllLink="/search?filter=new" /></Reveal>
      <Reveal><FeaturedBrands /></Reveal>
      <Reveal><CustomerReviews /></Reveal>
    </div>
  );
}
