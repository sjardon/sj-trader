import { CandlestickCollection } from "../../candlestick/candlestick.collection";
import { CandlestickModel } from "../../candlestick/candlestick.model";
import { SMA } from "../../utilities/operations.util";
import { IndicatorName } from "../indicator-name.enum";
import { IndicatorInterface } from "../indicator.interface";
import { IndicatorType } from "../indicator.type";

export type InputSmaIndicator = {
  candlesticks: CandlestickModel[];
  periods?: number;
};

export class SmaIndicator implements IndicatorInterface<IndicatorType> {
  candlesticks: CandlestickModel[];
  periods: number;

  constructor(inputEmaIndicator: InputSmaIndicator) {
    const { candlesticks, periods } = inputEmaIndicator;

    this.candlesticks = candlesticks;
    this.periods = periods || 5;
  }

  exec = (name: string = "") => {
    const closures = CandlestickCollection.getValuesOf(
      "close",
      this.candlesticks
    ) as number[];

    const value = SMA(closures, this.periods);

    return { name: name.length > 0 ? name : IndicatorName.SMA, value };
  };
}
