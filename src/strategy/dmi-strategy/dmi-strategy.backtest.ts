import { CandlestickModel } from "../../candlestick/candlestick.model";
import { CandlestickService } from "../../candlestick/candlestick.service";
import { CumulativeReturnIndicator } from "../../indicator/cumulative-return/cumulative-return.indicator";
import { DmiIndicator } from "../../indicator/dmi/dmi.indicator";
import { EmaIndicator } from "../../indicator/ema/ema.indicator";
import { IndicatorType } from "../../indicator/indicator.type";
import { InputOrderModel, OrderModel } from "../../order/order.model";
import { TimeframeCollection } from "../../timeframe/timeframe.collection";
import { TimeframeModel } from "../../timeframe/timeframe.model";
import { TradeBacktestModel } from "../../trade/trade-backtest/trade-backtest.model";

import {
  DMI,
  SMA,
  EMA,
  cumulativeReturn,
} from "../../utilities/operations.util";
import { DMIModel } from "../../utilities/operations/dmi.util";
import { StrategyModel } from "../strategy.model";
import { DmiStrategyModel } from "./dmi-strategy.model";

export class DmiStrategyBacktest {
  buyPrice: number = 0;
  maxPrice: number = 0;
  goDownFirst: boolean = false;
  openPosition: boolean = false;
  openPositionCandlesticks: CandlestickModel[] = [];
  trades: TradeBacktestModel[] = [];

  analyze = async (strategy: DmiStrategyModel) => {
    const timeframes = TimeframeCollection.serializeFromCandlesticks(
      await this.getData(strategy)
    );

    for (let i = strategy.term3; i < timeframes.length; i++) {
      const currentTimeframes = timeframes.slice(i - strategy.term3, i);

      const timeframe = timeframes[i];

      timeframes[i].indicators = this.getIndicators(
        currentTimeframes,
        strategy
      );

      if (this.openPosition) {
        this.openPositionCandlesticks.push(timeframes[i].candlestick);

        if (this.sellSignal(timeframes, strategy)) {
          const sellTime = new Date(timeframes[i].candlestick.closeTime);

          strategy.quantity =
            (strategy.quantity * timeframes[i].candlestick.close) /
            this.trades[this.trades.length - 1].buyOrder.price;

          const inputOrderModel: InputOrderModel = {
            symbol: strategy.symbol,
            orderId: 9999,
            clientOrderId: "###",
            price: timeframes[i].candlestick.close,
            origQty: strategy.quantity,
            executedQty: strategy.quantity,
            status: "SUCCESS",
            timeInForce: "100000",
            type: "MARKET",
            side: "SELL",
            transactTime: sellTime.getTime(),
          };
          this.trades[this.trades.length - 1].sellIndicadors =
            timeframes[i].indicators;
          this.trades[this.trades.length - 1].sellOrder = new OrderModel(
            inputOrderModel
          );
        }
      } else {
        if (this.buySignal(timeframes, strategy)) {
          this.openPositionCandlesticks = [];
          this.openPositionCandlesticks.push(timeframes[i].candlestick);
          const buyTime = new Date(timeframe.candlestick.closeTime);

          const inputOrderModel: InputOrderModel = {
            symbol: strategy.symbol,
            orderId: 9999,
            clientOrderId: "###",
            price: timeframe.candlestick.close,
            origQty: strategy.quantity,
            executedQty: strategy.quantity,
            status: "SUCCESS",
            timeInForce: "100000",
            type: "MARKET",
            side: "BUY",
            transactTime: buyTime.getTime(),
          };
          const trade = new TradeBacktestModel();
          trade.buyOrder = new OrderModel(inputOrderModel);
          trade.buyIndicadors = timeframes[i].indicators;
          this.trades.push(trade);
        }
      }
    }
  };

  sellSignal = (timeframes: TimeframeModel[], strategy: StrategyModel) => {
    return false;
    // if (
    //   // currentPrice.close > this.buyPrice * takeProfit ||
    //   // ((dmi.minusDI > dmi.plusDI || sma2 > sma1) && dmi.ADX > 25) ||
    //   // dmi.ADX < 25
    //   // sma2 > sma1 &&
    //   currentPrice.close < this.buyPrice * stopLoss ||
    //   (dmi.minusDI > dmi.plusDI && dmi.ADX > 25 && cumulativeReturn < 0)
    // ) {
    //   this.goDownFirst = false;
    //   this.openPosition = false;
    //   return true;
    // }
    // return false;
  };

  buySignal = (timeframes: TimeframeModel[], strategy: StrategyModel) => {
    return false;
    // if (sma1 < sma2) {
    //   this.goDownFirst = true;
    // }
    // if (
    //   dmi.minusDI < dmi.plusDI &&
    //   sma1 > sma2 && //
    //   sma1 > sma3 && //
    //   // currentPrice.low > sma3 &&
    //   // currentPrice.high > sma3 && //
    //   dmi.ADX > 35
    // ) {
    //   this.buyPrice = currentPrice.close;
    //   this.maxPrice = currentPrice.close;
    //   this.openPosition = true;
    //   return true;
    // }
    // return false;
  };

  getIndicators = (
    timeframes: TimeframeModel[],
    strategy: DmiStrategyModel
  ): IndicatorType[] => {
    try {
      const candlesticks = TimeframeCollection.getValuesOf(
        "candlestick",
        timeframes
      ) as CandlestickModel[];

      const indicators = [];

      indicators.push(
        new EmaIndicator({ candlesticks, periods: strategy.term1 }).exec(
          "EMA_1"
        )
      );
      indicators.push(
        new EmaIndicator({ candlesticks, periods: strategy.term2 }).exec(
          "EMA_2"
        )
      );
      indicators.push(
        new EmaIndicator({ candlesticks, periods: strategy.term3 }).exec(
          "EMA_3"
        )
      );

      indicators.push(new DmiIndicator({ candlesticks }).exec());

      indicators.push(
        new CumulativeReturnIndicator({
          candlesticks: this.openPositionCandlesticks,
          periods: 10,
        }).exec()
      );

      return indicators;
    } catch (thrownError) {
      return [];
    }
  };

  getData = async (strategy: DmiStrategyModel) => {
    let lastDate = new Date("January 01, 2022 00:00:00 GMT-0:00");
    const currentDate = new Date("January 28, 2022 00:00:00 GMT-0:00");

    let candles: CandlestickModel[] = [];
    let newCandlesticks = [];
    let isLastCandlesticks = false;

    while (!isLastCandlesticks) {
      newCandlesticks = await CandlestickService.get({
        symbol: strategy.symbol,
        interval: strategy.interval,
        lookback: 1000,
        startTime: lastDate.getTime(),
      });

      candles = candles.concat(newCandlesticks);

      lastDate = new Date(candles[candles.length - 1].closeTime + 60 * 1000);

      isLastCandlesticks =
        currentDate.getTime() < lastDate.getTime() ||
        newCandlesticks.length == 0;
    }
    return candles;
  };
}
