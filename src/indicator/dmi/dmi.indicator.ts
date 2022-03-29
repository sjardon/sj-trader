import { CandlestickCollection } from "../../candlestick/candlestick.collection";
import { CandlestickModel } from "../../candlestick/candlestick.model";
import { DMI, EMA } from "../../utilities/operations.util";
import { DMIModel } from "../../utilities/operations/dmi.util";
import { IndicatorName } from "../indicator-name.enum";
import { IndicatorInterface } from "../indicator.interface";
import { IndicatorType } from "../indicator.type";

type DmiIndicatorType = IndicatorType & {
  value: DMIModel;
};

export type InputDmiIndicator = {
  candlesticks: CandlestickModel[];
  periods?: number;
};

export class DmiIndicator implements IndicatorInterface<DmiIndicatorType> {
  candlesticks: CandlestickModel[];
  periods: number;

  constructor(inputEmaIndicator: InputDmiIndicator) {
    const { candlesticks, periods } = inputEmaIndicator;

    this.candlesticks = candlesticks;
    this.periods = periods || 5;
  }

  exec = (name: string = "") => {
    const value = DMI(this.candlesticks, this.periods);

    return {
      name: name.length > 0 ? name : IndicatorName.DMI,
      value,
    } as DmiIndicatorType;
  };
}
