export function getSeblings(
  page: number,
  total: number,
  seblingsCount: number = 1,
  barriers: "start" | "end" | undefined = undefined,
): number[] {
  const nums: number[] = [];
  const start = !barriers
    ? page - seblingsCount
    : Math.max(barriers === "start" ? 1 : total - seblingsCount * 2 - 2, 1);

  const end = !barriers
    ? page + seblingsCount
    : Math.min(
        barriers === "start" ? start + seblingsCount * 2 + 2 : total,
        total,
      );

  for (let i = start; i <= end; i++) {
    nums.push(i);
  }

  return nums;
}
