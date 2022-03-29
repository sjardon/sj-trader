import { Service } from "../base/service.class";
import { CandlestickService } from "../candlestick/candlestick.service";
import { StrategyModel } from "./strategy.model";
import { cumulativeReturn, pctChange } from "../utilities/operations.util";

export class StrategyService extends Service {
  static analyze = async (strategy: StrategyModel) => {
    let candlesticks = await CandlestickService.get(strategy);

    const prices = candlesticks.map((candlestick) => {
      return candlestick.close;
    });
    const cumReturns = cumulativeReturn(prices);
    console.log(cumReturns, cumReturns > 0);
  };
}
