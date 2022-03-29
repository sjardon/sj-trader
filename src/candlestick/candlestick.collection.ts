import { Collection } from "../base/collection.class";
import { CandlestickModel, InputCandlestickModel } from "./candlestick.model";

export class CandlestickCollection extends Collection {
  static serialize(
    inputCandlesticks: InputCandlestickModel[]
  ): CandlestickModel[] {
    return inputCandlesticks.map(
      (candlestick) => new CandlestickModel(candlestick)
    );
  }

  // getClosures(): number[] {
  //   return this.map((candlestick) => candlestick.close);
  // }

  // getOpenings(): number[] {
  //   return this.map((candlestick) => candlestick.open);
  // }

  // getHighs(): number[] {
  //   return this.map((candlestick) => candlestick.high);
  // }

  // getLowes(): number[] {
  //   return this.map((candlestick) => candlestick.high);
  // }
}
