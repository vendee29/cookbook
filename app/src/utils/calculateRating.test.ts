import { calculateRating } from "./calculateRating";

const testRating1 = {user_id: "Luke", rating: 1};
const testRating2 = {user_id: "Leia", rating: 2};
const testRating3 = {user_id: "Han", rating: 5};

describe("calculateRating function", () => {
  test("calculates rating correctly", () => {
    const testRatings = [testRating1, testRating2, testRating3];
    const testRatings2 = [testRating1, testRating1, testRating2];
    expect(calculateRating([testRating1])).toBe(1);
    expect(calculateRating(testRatings)).toBe(3);
    expect(calculateRating(testRatings2)).toBe(1);
  });

  test("returns 0 when an empty array is passed", () => {
    expect(calculateRating([])).toBe(0);
  });

  test("returns 0 when undefined is passed", () => {
    expect(calculateRating(undefined)).toBe(0);
  });
});
