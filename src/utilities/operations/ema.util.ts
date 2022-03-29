import { SMA } from "./sma.util";

export function EMA(numbers: number[], periods: number) {
    const coefficient = 2/(periods + 1);
    const sma = SMA(numbers,periods-1);
    return sma + coefficient * (numbers[numbers.length-1]-sma);
}
  