import { Model } from "../base/model.class";

export type InputCoinModel = {
  symbol?: string;
};

export class CoinModel extends Model {
  symbol: string;

  constructor(inputCoinModel: InputCoinModel = {}) {
    super();
    const { symbol } = inputCoinModel;
    this.symbol = symbol || "";
  }
}
