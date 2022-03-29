export function pctChange(numbers: number[]) {
  const percentages: number[] = [];

  for (let i = 0; i < numbers.length; i++) {
    const prev = numbers[i - 1];
    const act = numbers[i];
    percentages.push(prev ? act / prev - 1 : NaN);
  }

  return percentages;
}
