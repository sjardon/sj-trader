import { CandleChartInterval_LT } from "binance-api-node";
import { Model } from "../base/model.class";

export type InputStrategyModel = {
  interval?: CandleChartInterval_LT;
  lookback?: number;
  symbol?: string;
  stopLoss?: number;
  takeProfit?: number;
  quantity?: number;
};

export class StrategyModel extends Model {
  interval: CandleChartInterval_LT;
  lookback: number;
  symbol: string;
  stopLoss: number;
  takeProfit: number;
  quantity: number;

  constructor(inputStrategyModel: InputStrategyModel = {}) {
    super();

    const { interval, lookback, symbol, stopLoss, takeProfit, quantity } =
      inputStrategyModel;

    this.interval = interval || "1m";
    this.lookback = lookback || 250;
    this.symbol = symbol || "";
    this.stopLoss = stopLoss || 1;
    this.takeProfit = takeProfit || 1;
    this.quantity = quantity || 0;
  }
}
