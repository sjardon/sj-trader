import { pctChange } from "./pct-change.util";

export function cumulativeReturn(numbers: number[]) {
  const returns = pctChange(numbers);
  const cumReturns: number[] = [];

  for (let i = 0; i < returns.length; i++) {
    const cumReturnPrev = cumReturns[cumReturns.length - 1]
      ? cumReturns[cumReturns.length - 1]
      : 0;

    cumReturns.push(
      isNaN(returns[i]) ? NaN : (returns[i] + 1) * (cumReturnPrev + 1) - 1
    );
  }

  return cumReturns[cumReturns.length - 1];
}
