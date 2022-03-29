import { Service } from "../base/service.class";
import { binanceClient } from "../utilities/binance.util";

export type InputCreateOrder = {
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  price: number;
};

export class OrderService extends Service {
  create = (inputCreateOrder: InputCreateOrder) => {
    const { symbol, side, quantity, price } = inputCreateOrder;
    binanceClient.order({ symbol, side, quantity, price });
  };
}
