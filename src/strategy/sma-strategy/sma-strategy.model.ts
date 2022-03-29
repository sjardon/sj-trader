import { InputStrategyModel, StrategyModel } from "../strategy.model";

export type InputSmaStrategyModel = {
  term1?: number;
  term2?: number;
  term3?: number;
} & InputStrategyModel;

export class SmaStrategyModel extends StrategyModel {
  term1: number;
  term2: number;
  term3: number;

  constructor(inputSmaStrategyModel: InputSmaStrategyModel = {}) {
    super(inputSmaStrategyModel);

    const { term1, term2, term3 } = inputSmaStrategyModel;

    this.term1 = term1 || 0;
    this.term2 = term2 || 0;
    this.term3 = term3 || 0;
  }
}
