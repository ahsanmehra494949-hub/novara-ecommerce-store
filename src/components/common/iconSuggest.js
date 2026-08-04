// Suggests a relevant emoji icon for a category name typed by the admin.
// This is a lightweight keyword match — it only fills the icon field
// automatically as a starting point; the admin can still overwrite it.
const KEYWORD_ICONS = [
  [['electronic', 'gadget', 'phone', 'mobile', 'laptop', 'computer', 'audio', 'headphone'], '🎧'],
  [['fashion', 'cloth', 'apparel', 'wear', 'shirt', 'dress'], '👕'],
  [['shoe', 'sneaker', 'footwear'], '👟'],
  [['bag', 'luggage', 'wallet'], '👜'],
  [['jewel', 'watch', 'accessor'], '💍'],
  [['home', 'living', 'furniture', 'decor'], '🛋️'],
  [['kitchen', 'cook', 'appliance'], '🍳'],
  [['beauty', 'makeup', 'cosmetic', 'skin'], '💄'],
  [['health', 'wellness', 'medic'], '💊'],
  [['sport', 'fitness', 'gym', 'workout'], '🏋️'],
  [['outdoor', 'camp', 'hike'], '🏕️'],
  [['kid', 'toy', 'baby', 'child'], '🧸'],
  [['book', 'stationery', 'office'], '📚'],
  [['pet', 'animal'], '🐾'],
  [['grocery', 'food', 'snack', 'drink'], '🛒'],
  [['garden', 'plant', 'outdoor living'], '🌿'],
  [['auto', 'car', 'vehicle', 'bike'], '🚗'],
  [['music', 'instrument'], '🎵'],
  [['art', 'craft', 'paint'], '🎨'],
  [['tool', 'hardware', 'diy'], '🛠️'],
  [['gift', 'occasion', 'event'], '🎁'],
];

export default function suggestIcon(name = '') {
  const lower = name.toLowerCase();
  for (const [keywords, icon] of KEYWORD_ICONS) {
    if (keywords.some((k) => lower.includes(k))) return icon;
  }
  return '🏷️';
}
