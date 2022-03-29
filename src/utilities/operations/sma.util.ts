export function SMA(numbers: number[], periods: number) {
  const sum = numbers.slice(numbers.length - periods).reduce((acc, n) => {
    return acc + n;
  }, 0);
  return sum / periods;
}
