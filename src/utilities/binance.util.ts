import Binance from "binance-api-node";
import conf from "../conf";

console.log(conf);

export const binanceClient = Binance({
  apiKey: conf.BinanceApiKey,
  apiSecret: conf.BinanceApiSecret,
  getTime: () => Date.now(),
});
