export function calculateRating(
  ratings: { user_id: string; rating: number }[] | undefined
): number {
  if (ratings === undefined) return 0;
  if (ratings.length === 0) return 0;
  const sum = ratings
    .map((rating) => rating.rating)
    .reduce((acc, val) => acc + val);
  return sum / ratings.length;
}
