import { IndicatorName } from "../../../indicator/indicator-name.enum";
import { SignalInterface } from "../../../signal/signal.interface";
import { TimeframeModel } from "../../../timeframe/timeframe.model";
import { StrategyModel } from "../../strategy.model";


export class DmiBuySignal implements SignalInterface{
    analyze = (timeframes: TimeframeModel[], strategy: StrategyModel) => {

        const lastTimeframe = timeframes[timeframes.length-1];
        const {
            EMA_1,
            EMA_2,
            EMA_3,
            DMI,
            CumulativeReturn
        } = this.getIndicators(lastTimeframe);
        if (
        // currentPrice.close > this.buyPrice * takeProfit ||
        // ((dmi.minusDI > dmi.plusDI || sma2 > sma1) && dmi.ADX > 25) ||
        // dmi.ADX < 25
        // sma2 > sma1 &&
        lastTimeframe.candlestick.close < this.buyPrice * stopLoss ||
        (dmi.minusDI > dmi.plusDI && dmi.ADX > 25 && cumulativeReturn < 0)
        ) {
        this.goDownFirst = false;
        this.openPosition = false;
        return true;
        }
        return false;
    }

    getIndicators = (timeframe: TimeframeModel) => {
        const EMA_1 = timeframe.getIndicator('EMA_1');
        const EMA_2 = timeframe.getIndicator('EMA_2');
        const EMA_3 = timeframe.getIndicator('EMA_3');
        const DMI = timeframe.getIndicator(IndicatorName.DMI);
        const CumulativeReturn = timeframe.getIndicator(IndicatorName.CUMULATIVE_RETURN);

        return {
            EMA_1,
            EMA_2,
            EMA_3,
            DMI,
            CumulativeReturn
        }

    }
}
