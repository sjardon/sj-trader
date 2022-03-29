import { Service } from "../base/service.class";
import { SmaStrategyService } from "../strategy/sma-strategy/sma-strategy.service";
import { StrategyService } from "../strategy/strategy.service";
import { binanceClient } from "../utilities/binance.util";
import { TraderModel } from "./trader.model";

export class TraderService extends Service {
  getOpenPosition = async (symbol: string) => {
    try {
      const account = await binanceClient.accountInfo();
      return account.balances.some((balance) => {
        return symbol.startsWith(balance.asset) && parseFloat(balance.free) > 0;
      });
    } catch (error) {
      throw error;
    }
  };
}
