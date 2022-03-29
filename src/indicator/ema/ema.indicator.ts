import { CandlestickCollection } from "../../candlestick/candlestick.collection";
import { CandlestickModel } from "../../candlestick/candlestick.model";
import { EMA } from "../../utilities/operations.util";
import { IndicatorName } from "../indicator-name.enum";
import { IndicatorInterface } from "../indicator.interface";
import { IndicatorType } from "../indicator.type";

export type InputEmaIndicator = {
  candlesticks: CandlestickModel[];
  periods?: number;
};

export class EmaIndicator implements IndicatorInterface<IndicatorType> {
  candlesticks: CandlestickModel[];
  periods: number;

  constructor(inputEmaIndicator: InputEmaIndicator) {
    const { candlesticks, periods } = inputEmaIndicator;

    this.candlesticks = candlesticks;
    this.periods = periods || 5;
  }

  exec = (name: string = "") => {
    const closures = CandlestickCollection.getValuesOf(
      "close",
      this.candlesticks
    ) as number[];

    const value = EMA(closures, this.periods);

    return { name: name.length > 0 ? name : IndicatorName.EMA, value };
  };
}
