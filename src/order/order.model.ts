import { Model } from "../base/model.class";

export type InputOrderModel = {
  symbol?: string;
  orderId?: number;
  clientOrderId?: string;
  price?: number;
  origQty?: number;
  executedQty?: number;
  status?: string;
  timeInForce?: string;
  type?: string;
  side?: string;
  transactTime?: number;
};

export class OrderModel extends Model {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  price: number;
  origQty: number;
  executedQty: number;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  transactTime: number;

  constructor(inputOrderModel: InputOrderModel = {}) {
    super();
    const {
      symbol,
      orderId,
      clientOrderId,
      price,
      origQty,
      executedQty,
      status,
      timeInForce,
      type,
      side,
      transactTime,
    } = inputOrderModel;

    this.symbol = symbol || "";
    this.orderId = orderId || 0;
    this.clientOrderId = clientOrderId || "";
    this.price = price || 0;
    this.origQty = origQty || 0;
    this.executedQty = executedQty || 0;
    this.status = status || "";
    this.timeInForce = timeInForce || "";
    this.type = type || "";
    this.side = side || "";
    this.transactTime = transactTime || 0;
  }
}
