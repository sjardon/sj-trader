import { StrategyModel } from "../strategy/strategy.model";
import { TimeframeModel } from "../timeframe/timeframe.model";

export interface SignalInterface {
    analyze(timeframes: TimeframeModel[], strategy: StrategyModel): boolean;
}
  