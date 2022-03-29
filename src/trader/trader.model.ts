import { Model } from "../base/model.class";
import { StrategyModel } from "../strategy/strategy.model";

export type InputTraderModel = {
  strategies?: StrategyModel[];
};

export class TraderModel extends Model {
  strategies;

  constructor(inputTraderModel: InputTraderModel) {
    super();
    const { strategies } = inputTraderModel;
    this.strategies = strategies || [];
  }
}
