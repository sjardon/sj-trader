import { SignalInterface } from "../../../signal/signal.interface";
import { TimeframeModel } from "../../../timeframe/timeframe.model";
import { StrategyModel } from "../../strategy.model";


export class DmiBuySignal implements SignalInterface{
    analyze = (timeframes: TimeframeModel[], strategy: StrategyModel) => {
        return false;
    }
}
