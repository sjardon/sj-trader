import { Service } from "../base/service.class";
import { TradeBacktestModel } from "../trade/trade-backtest/trade-backtest.model";

export class BacktestService extends Service {
  static print = (trades: TradeBacktestModel[]) => {
    let winCount = 0;
    let lossCount = 0;
    trades.forEach((trade) => {
      console.log("------------------------------------------------------");

      const buyTime = new Date(trade.buyOrder.transactTime);
      const sellTime = new Date(trade.sellOrder.transactTime);
      const isWinner = trade.buyOrder.price < trade.sellOrder.price;
      if (isWinner) {
        winCount++;
      } else {
        lossCount++;
      }

      printWithLines(
        isWinner ? "\x1b[33mWIN:\x1b[0m" : "\x1b[33mLOSS:\x1b[0m",
        `${trade.sellOrder.price / trade.buyOrder.price}`
      );
      printWithLines(
        `\x1b[33mPRICE:\x1b[0m`,
        `${trade.buyOrder.price} - ${trade.sellOrder.price}`
      );
      printWithLines(`\x1b[33mQUANTITY:\x1b[0m`, `${trade.sellOrder.origQty}`);
      printWithLines(
        `\x1b[33mTIME:\x1b[0m`,
        `${buyTime.toISOString()} - ${sellTime.toISOString()}`
      );

      printWithLines(`\x1b[33mBUY INDICATORS\x1b[0m`, "");

      Object.keys(trade.buyIndicadors).forEach((key) => {
        let indicatorStr = "";
        if (typeof trade.buyIndicadors[key] == "object") {
          indicatorStr = JSON.stringify(trade.buyIndicadors[key]);
        } else {
          indicatorStr = trade.buyIndicadors[key];
        }
        printWithLines(`\x1b[33m${key}:\x1b[0m`, indicatorStr);
      });

      printWithLines(`\x1b[33mSELL INDICATORS\x1b[0m`, "");

      Object.keys(trade.sellIndicadors).forEach((key) => {
        let indicatorStr = "";
        if (typeof trade.sellIndicadors[key] == "object") {
          indicatorStr = JSON.stringify(trade.sellIndicadors[key]);
        } else {
          indicatorStr = trade.sellIndicadors[key];
        }
        printWithLines(`\x1b[33m${key}:\x1b[0m`, indicatorStr);
      });
    });

    console.log("------------------------------------------------------");
    console.log("------------------------------------------------------");
    printWithLines("    \x1b[33mWIN\x1b[0m", `${winCount}`);
    printWithLines("    \x1b[33mLOSS\x1b[0m", `${lossCount}`);
  };
}

const printWithLines = (
  key: string,
  description: string,
  totalSpace: number = 30
) => {
  const freeSpace = totalSpace - key.length;
  let lines = "-".repeat(freeSpace >= 0 ? freeSpace : 0);
  console.log(`${key}${lines}${description}`);
};
