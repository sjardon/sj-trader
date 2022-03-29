import { CandlestickModel } from "../../candlestick/candlestick.model";

export type DMIModel = {
  plusDI: number;
  minusDI: number;
  ADX: number;
};

export function DMI(
  candlesticks: CandlestickModel[],
  periods: number = 14
): DMIModel {
  // The last candlestick it's where calculate the DMI

  if (candlesticks.length < periods * 2) {
    throw new Error("To short candlesticks frames");
  }
  if (candlesticks.length > periods) {
    candlesticks = candlesticks.slice(candlesticks.length - periods * 2);
  }

  // Sumatoria de los DM - (Sumatoria de los DM / periods) + currentDM

  let sumDX = 0;
  let plusDI = 0;
  let minusDI = 0;

  for (let j = 0; j < candlesticks.length - periods; j++) {
    const currentCandlesticks = candlesticks.slice(j, j + periods);

    const currentPlusDm =
      currentCandlesticks[currentCandlesticks.length - 1].high -
      currentCandlesticks[currentCandlesticks.length - 2].high;
    const currentMinusDm =
      currentCandlesticks[currentCandlesticks.length - 2].low -
      currentCandlesticks[currentCandlesticks.length - 1].low;

    let sumPlusDM = 0;
    let sumMinusDM = 0;
    let sumTR = 0;

    for (let i = 1; i < currentCandlesticks.length; i++) {
      const hMinPrevH =
        currentCandlesticks[i].high - currentCandlesticks[i - 1].high;
      const prevLMinusL =
        currentCandlesticks[i - 1].low - currentCandlesticks[i].low;

      sumPlusDM += hMinPrevH > prevLMinusL ? hMinPrevH : 0;
      sumMinusDM += prevLMinusL > hMinPrevH ? prevLMinusL : 0;
      sumTR += Math.max(
        currentCandlesticks[i].high - currentCandlesticks[i].low,
        Math.abs(
          currentCandlesticks[i].high - currentCandlesticks[i - 1].close
        ),
        Math.abs(currentCandlesticks[i].low - currentCandlesticks[i - 1].close)
      );
    }

    const smoothedPlusDM = sumPlusDM / periods;
    const smoothedMinusDM = sumMinusDM / periods;

    const ATR = sumTR / periods;

    plusDI = (smoothedPlusDM / ATR) * 100;
    minusDI = (smoothedMinusDM / ATR) * 100;

    sumDX += Math.abs((plusDI - minusDI) / (plusDI + minusDI)) * 100;
  }

  const ADX = sumDX / periods;

  return {
    plusDI,
    minusDI,
    ADX,
  };
  // Falta calcular ADX que es el promedio de los 14 DX anteriores.
}
