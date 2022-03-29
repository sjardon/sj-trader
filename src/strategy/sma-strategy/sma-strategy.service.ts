import { CandlestickService } from "../../candlestick/candlestick.service";
import { SMA } from "../../utilities/operations.util";
import { SmaStrategyModel } from "./sma-strategy.model";
import { interval2Ms } from "../../utilities/interval-2-ms.util";
import { TraderService } from "../../trader/trader.service";
import { binanceClient } from "../../utilities/binance.util";
import { OrderType } from "binance-api-node";

export class SmaStrategyService {
  buyPrice: number = 0;
  maxPrice: number = 0;
  openPosition: boolean = false;

  analyze = async (strategy: SmaStrategyModel) => {
    const trader = new TraderService();
    this.openPosition = await trader.getOpenPosition(strategy.symbol);

    let candlesticks = await CandlestickService.get({
      symbol: strategy.symbol,
      interval: strategy.interval,
      lookback: strategy.longTerm,
    });

    setInterval(async () => {
      candlesticks = await CandlestickService.get({
        symbol: strategy.symbol,
        interval: strategy.interval,
        lookback: strategy.longTerm,
      });

      console.log(
        "Loading historicals",
        candlesticks[candlesticks.length - 2].openTime
      );
    }, interval2Ms(strategy.interval));

    const candlestickObs = CandlestickService.getCurrent({
      symbols: [strategy.symbol],
      interval: strategy.interval,
    });

    candlestickObs.subscribe((candlestick) => {
      if (this.openPosition) {
        if (
          this.sellSignal(
            candlestick.close,
            strategy.stopLoss,
            strategy.takeProfit
          )
        ) {
          // binanceClient.order({
          //   symbol: strategy.symbol,
          //   side: "SELL",
          //   type: OrderType.MARKET,
          //   quantity: strategy.quantity.toString(),
          //   price: candlestick.close.toString(),
          // });
        }
      } else {
        candlesticks.pop();
        candlesticks.push(candlestick);

        const closures = candlesticks.map((candle) => candle.close);

        const shortSma = SMA(closures, strategy.shortTerm);
        const longSma = SMA(closures, strategy.longTerm);

        if (this.buySignal(candlestick.close, shortSma, longSma)) {
          // binanceClient.order({
          //   symbol: strategy.symbol,
          //   side: "BUY",
          //   type: OrderType.MARKET,
          //   quantity: strategy.quantity.toString(),
          //   price: candlestick.close.toString(),
          // });
        }
      }
    });
  };

  sellSignal = (currentPrice: number, stopLoss: number, takeProfit: number) => {
    if (currentPrice > this.maxPrice) {
      this.maxPrice = currentPrice;
    }

    if (
      currentPrice < this.maxPrice * stopLoss ||
      currentPrice > this.maxPrice * takeProfit
    ) {
      console.log("---------SELL by", currentPrice);
      this.openPosition = false;

      return true;
    }

    return false;
  };

  buySignal = (currentPrice: number, shortSma: number, longSma: number) => {
    // Posibilities:
    //  - Add one more long sma to confirm the signal.
    //  - Check the slope of the shortSma and longSma aren't parallels
    //  - Add some diference between shortSma and longSma to waint a litte of time to confirm the buy signal.
    //  - Use longer intervals

    if (shortSma > longSma) {
      this.buyPrice = currentPrice;
      this.maxPrice = currentPrice;
      console.log("---------BUY by", this.buyPrice);
      this.openPosition = true;
      return true;
    }

    return false;
  };
}
