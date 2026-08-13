import { occasions } from '../data/occasions';

export function getUpcomingOccasion(lookaheadDays = 21) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let closest = null;
  let closestDiff = Infinity;

  occasions.forEach((o) => {
    const date = new Date(o.date + 'T00:00:00');
    const diffDays = Math.round((date - today) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= lookaheadDays && diffDays < closestDiff) {
      closest = { ...o, daysAway: diffDays };
      closestDiff = diffDays;
    }
  });

  return closest;
}
