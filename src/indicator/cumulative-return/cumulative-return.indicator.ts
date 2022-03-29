import { CandlestickCollection } from "../../candlestick/candlestick.collection";
import { CandlestickModel } from "../../candlestick/candlestick.model";
import { cumulativeReturn, SMA } from "../../utilities/operations.util";
import { IndicatorName } from "../indicator-name.enum";
import { IndicatorInterface } from "../indicator.interface";
import { IndicatorType } from "../indicator.type";

export type InputCumulativeReturnIndicator = {
  candlesticks: CandlestickModel[];
  periods?: number;
};

export class CumulativeReturnIndicator
  implements IndicatorInterface<IndicatorType>
{
  candlesticks: CandlestickModel[];
  periods: number;

  constructor(inputEmaIndicator: InputCumulativeReturnIndicator) {
    const { candlesticks, periods } = inputEmaIndicator;

    this.candlesticks = candlesticks;
    this.periods = periods || 5;
  }

  exec = (name: string = "") => {
    const closures = CandlestickCollection.getValuesOf(
      "close",
      this.candlesticks
    ) as number[];

    const value = cumulativeReturn(
      closures.slice(
        closures.length >= this.periods ? closures.length - this.periods : 0
      )
    );

    return {
      name: name.length > 0 ? name : IndicatorName.CUMULATIVE_RETURN,
      value,
    };
  };
}
