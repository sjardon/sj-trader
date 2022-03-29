import { Collection } from "../base/collection.class";
import { CandlestickCollection } from "../candlestick/candlestick.collection";
import { CandlestickModel } from "../candlestick/candlestick.model";
import { TimeframeModel, InputTimeframeModel } from "./timeframe.model";

export class TimeframeCollection extends Collection {
  static serialize(input: InputTimeframeModel[]): TimeframeModel[] {
    return input.map((timeframe) => {
      return new TimeframeModel(timeframe);
    });
  }

  static serializeFromCandlesticks(
    candlesticks: CandlestickModel[]
  ): TimeframeModel[] {
    return candlesticks.map(
      (candlestick) => new TimeframeModel({ candlestick })
    );
  }
}
