import { readFile, writeFile, access } from "fs/promises";
import { Service } from "../base/service.class";
import { binanceClient } from "../utilities/binance.util";
import { toPlainObject } from "../utilities/objects.util";
import { CandlestickCollection } from "./candlestick.collection";
import {
  asyncScheduler,
  bindCallback,
  from,
  map,
  Observable,
  Subject,
} from "rxjs";
import { CandlestickModel } from "./candlestick.model";
import { CandlesOptions } from "binance-api-node";

const candlesticksPath = `${__dirname}/../../data/`;

export class CandlestickService extends Service {
  static get = async (
    { symbol, interval, lookback, startTime, endTime }: any,
    renew = false
  ) => {
    if (lookback > 1000) {
      throw new Error("Lookback period is too big");
    }

    if (!renew) {
      try {
        return await this.getFromFile({
          symbol,
          interval,
          startTime,
          endTime,
        });
      } catch (thrownError) {}
    }

    try {
      const inputCandles: CandlesOptions = {
        symbol,
        interval,
        limit: lookback,
      };

      if (startTime) {
        inputCandles.startTime = startTime;
      }

      if (endTime) {
        inputCandles.endTime = endTime;
      }

      let candlesticks = await binanceClient.candles(inputCandles);
      let objects = candlesticks.map((candle): any => {
        return toPlainObject({ symbol, ...candle });
      });

      objects = CandlestickCollection.serialize(objects);

      if (objects.length > 0) {
        await this.saveOnFile(
          { symbol, interval, startTime, endTime },
          objects
        );
      }

      return objects;
    } catch (thrownError) {
      throw thrownError;
    }
  };

  static getFromFile = async ({
    symbol,
    interval,
    lookback,
    startTime,
    endTime,
  }: any) => {
    let path = `${candlesticksPath}${symbol}-${interval}`;
    path += startTime ? `-${startTime}` : "";
    path += endTime ? `-${endTime}` : "";
    path += ".json";

    try {
      await access(path);

      let candlesticksFromFile = await readFile(path, "utf8");
      const candlesticks = JSON.parse(candlesticksFromFile);

      return CandlestickCollection.serialize(candlesticks);
    } catch (thrownError) {
      throw thrownError;
    }
  };

  static saveOnFile = async (
    { symbol, interval, startTime, endTime }: any,
    candlesticks: CandlestickModel[]
  ) => {
    let path = `${candlesticksPath}${symbol}-${interval}`;
    path += startTime ? `-${startTime}` : "";
    path += endTime ? `-${endTime}` : "";
    path += ".json";

    const candlesticksToSave = JSON.stringify(candlesticks);

    try {
      await writeFile(path, candlesticksToSave);
    } catch (thrownError) {
      return false;
    }
  };

  static getCurrent = ({ symbols, interval }: any) => {
    const subject = new Subject<CandlestickModel>();

    binanceClient.ws.candles(symbols, interval, (candle) => {
      if (candle) {
        subject.next(new CandlestickModel(toPlainObject(candle)));
      }
    });

    return subject;
  };
}
