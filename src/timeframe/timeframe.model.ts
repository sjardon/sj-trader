import { Model } from "../base/model.class";
import { CandlestickModel } from "../candlestick/candlestick.model";
import { IndicatorInterface } from "../indicator/indicator.interface";
import { IndicatorType } from "../indicator/indicator.type";

export type InputTimeframeModel = {
  candlestick?: CandlestickModel;
  indicators?: any[];
};

export class TimeframeModel extends Model {
  candlestick: CandlestickModel;
  indicators: IndicatorType[];

  constructor(inputTimeframeModel: InputTimeframeModel = {}) {
    super();

    const { candlestick, indicators } = inputTimeframeModel;

    this.candlestick = candlestick || new CandlestickModel();
    this.indicators = indicators || [];
  }

  getIndicator = (name: string): IndicatorType | boolean => {
    const indicator = this.indicators.find((indicator) => indicator.name == name);

    return indicator ? indicator : false;

  };
}
