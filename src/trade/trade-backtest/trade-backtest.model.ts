import { IndicatorType } from "../../indicator/indicator.type";
import { InputTradeModel, TradeModel } from "../trade.model";

export type InputTradeBacktestModel = InputTradeModel & {
  buyIndicadors: any;
  sellIndicadors: any;
};

export class TradeBacktestModel extends TradeModel {
  buyIndicadors: IndicatorType[];
  sellIndicadors: IndicatorType[];

  constructor() {
    super();
    this.buyIndicadors = [];
    this.sellIndicadors = [];
  }
}
