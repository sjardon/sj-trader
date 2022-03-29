import { Model } from "../base/model.class";

export type InputCandlestickModel = {
  symbol?: string;
  openTime?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
  closeTime?: number;
  quoteVolume?: number;
  trades?: number;
  baseAssetVolume?: number;
  quoteAssetVolume?: number;
};

export class CandlestickModel extends Model {
  symbol: string;
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteVolume: number;
  trades: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;

  constructor(inputCandlestickModel: InputCandlestickModel = {}) {
    super();
    const {
      symbol,
      openTime,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteVolume,
      trades,
      baseAssetVolume,
      quoteAssetVolume,
    } = inputCandlestickModel;

    this.symbol = symbol || "";
    this.openTime = openTime || 0;
    this.open = +(open || 0);
    this.high = +(high || 0);
    this.low = +(low || 0);
    this.close = +(close || 0);
    this.volume = +(volume || 0);
    this.closeTime = closeTime || 0;
    this.quoteVolume = +(quoteVolume || 0);
    this.trades = +(trades || 0);
    this.baseAssetVolume = +(baseAssetVolume || 0);
    this.quoteAssetVolume = +(quoteAssetVolume || 0);
  }
}
