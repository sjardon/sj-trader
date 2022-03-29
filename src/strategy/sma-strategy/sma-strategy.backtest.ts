import { CandlestickService } from "../../candlestick/candlestick.service";
import { SMA } from "../../utilities/operations.util";
import { SmaStrategyModel } from "./sma-strategy.model";

export class SmaStrategyBacktest {
  buyPrice: number = 0;
  maxPrice: number = 0;
  goDownFirst: boolean = false;
  openPosition: boolean = false;
  toPrintData: any = {
    buyPrice: 0,
    sellPrice: 0,
    buyTime: "",
    sellTime: "",
    profit: 0,
    winLoss: "N/A",
  };

  analyze = async (strategy: SmaStrategyModel) => {
    const date = new Date("Febrary 15, 2022 08:00:00 GMT-0:00");

    let candlesticks = await CandlestickService.get({
      symbol: strategy.symbol,
      interval: strategy.interval,
      lookback: 1000,
      startTime: date.getTime(),
    });

    let newCandlesticks = [];

    do {
      const lastDate = new Date(
        candlesticks[candlesticks.length - 1].closeTime + 60 * 1000
      );

      newCandlesticks = await CandlestickService.get({
        symbol: strategy.symbol,
        interval: strategy.interval,
        lookback: 1000,
        startTime: lastDate.getTime(),
      });
      candlesticks = candlesticks.concat(newCandlesticks);
    } while (newCandlesticks.length > 0);
    // return;

    for (let i = strategy.term3; i < candlesticks.length; i++) {
      const currentCandlesticks = candlesticks.slice(i - strategy.term3, i);

      const candlestick = candlesticks[i];

      if (this.openPosition) {
        if (
          this.sellSignal(
            candlestick.high,
            strategy.stopLoss,
            strategy.takeProfit
          )
        ) {
          this.toPrintData.sellPrice = candlestick.close;
          const sellTime = new Date(candlestick.closeTime);
          this.toPrintData.sellTime = sellTime.toUTCString();
          this.toPrintData.winLoss =
            candlestick.close > this.buyPrice ? `WIN` : `LOSS`;
          this.toPrintData.profit = candlestick.close / this.buyPrice;
          this.toPrintData.quantity =
            (strategy.quantity * candlestick.close) / this.buyPrice;
          strategy.quantity =
            (strategy.quantity * candlestick.close) / this.buyPrice;
          console.table(this.toPrintData);
        }
      } else {
        currentCandlesticks.pop();
        currentCandlesticks.push(candlestick);

        const closures = currentCandlesticks.map((candle) => candle.close);

        const sma1 = SMA(closures, strategy.term1);
        const sma2 = SMA(closures, strategy.term2);
        const sma3 = SMA(closures, strategy.term3);

        if (this.buySignal(candlestick.close, sma1, sma2, sma3)) {
          this.toPrintData.buyPrice = candlestick.close;
          const buyTime = new Date(candlestick.closeTime);
          this.toPrintData.buyTime = buyTime.toUTCString();
        }
      }
    }
  };

  sellSignal = (currentPrice: number, stopLoss: number, takeProfit: number) => {
    if (currentPrice > this.maxPrice) {
      this.maxPrice = currentPrice;
    }

    if (
      currentPrice < this.maxPrice * stopLoss ||
      currentPrice > this.maxPrice * takeProfit
    ) {
      // if (
      //   currentPrice < this.buyPrice * stopLoss ||
      //   currentPrice > this.buyPrice * takeProfit
      // ) {
      this.goDownFirst = false;
      this.openPosition = false;

      return true;
    }

    return false;
  };

  buySignal = (
    currentPrice: number,
    sma1: number,
    sma2: number,
    sma3: number
  ) => {
    if (sma1 < sma2) {
      this.goDownFirst = true;
    }

    if (sma1 > sma2 && sma1 > sma3 && this.goDownFirst) {
      this.buyPrice = currentPrice;
      this.maxPrice = currentPrice;
      this.openPosition = true;
      return true;
    }

    return false;
  };
}
