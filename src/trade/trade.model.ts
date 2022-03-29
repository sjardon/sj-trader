import { Model } from "../base/model.class";
import { OrderModel } from "../order/order.model";

export type InputTradeModel = {
  buyOrder: OrderModel;
  sellOrder: OrderModel;
};

export class TradeModel extends Model {
  buyOrder: OrderModel;
  sellOrder: OrderModel;

  constructor() {
    super();
    this.buyOrder = new OrderModel();
    this.sellOrder = new OrderModel();
  }
}
