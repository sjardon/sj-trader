import * as dotenv from "dotenv";
import { DmiStrategyBacktest } from "./strategy/dmi-strategy/dmi-strategy.backtest";
import { DmiStrategyModel } from "./strategy/dmi-strategy/dmi-strategy.model";
import { SmaStrategyBacktest } from "./strategy/sma-strategy/sma-strategy.backtest";
dotenv.config({ path: __dirname + "/../.env" });

import { SmaStrategyModel } from "./strategy/sma-strategy/sma-strategy.model";
import { SmaStrategyService } from "./strategy/sma-strategy/sma-strategy.service";

const run = () => {
  // const smaStrategy = new SmaStrategyService();
  // const smaStrategy = new SmaStrategyBacktest();

  // const smaStrategyModel = new SmaStrategyModel({
  //   interval: "15m",
  //   lookback: 20,
  //   term1: 5,
  //   term2: 20,
  //   term3: 100,
  //   stopLoss: 0.987,
  //   takeProfit: 1.0168,
  //   quantity: 200,
  //   // symbol: "SHIBUSDT",
  //   symbol: "DOTUSDT",
  //   // symbol: "BTCUSDT",
  // });

  // smaStrategy.analyze(smaStrategyModel);
  const dmiStrategy = new DmiStrategyBacktest();

  const dmiStrategyModel = new DmiStrategyModel({
    interval: "30m",
    lookback: 20,
    term1: 5,
    term2: 20,
    term3: 100,
    stopLoss: 0.985,
    takeProfit: 1.01,
    quantity: 100,
    symbol: "SHIBUSDT",
    // symbol: "DOTUSDT",
    // symbol: "BTCUSDT",
  });

  dmiStrategy.analyze(dmiStrategyModel);
};

run();
