import { InputTradeModel, TradeModel } from "../trade.model";

export type InputTradeBacktestModel = InputTradeModel & {
  buyIndicadors: any;
  sellIndicadors: any;
};

export class TradeBacktestModel extends TradeModel {
  buyIndicadors: any;
  sellIndicadors: any;

  constructor() {
    super();
    this.buyIndicadors = {};
    this.sellIndicadors = {};
  }
}
