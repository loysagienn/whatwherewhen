import { DEFAULT_LEFT_TIME, INTERVAL } from '../constants';
import updateTimerMessage from './updateTimerMessage';
import sendTimeoutMessage from './sendTimeoutMessage';

const createNewContext = (chatId) => ({
    chatId,
});

class Contexts {
    constructor() {
        this.contexts = {};
    }

    get(chatId) {
        let context = this.contexts[chatId];

        if (context) {
            return context;
        }

        context = createNewContext(chatId);

        this.contexts[chatId] = context;

        return context;
    }

    timerIsActive(chatId) {
        const context = this.get(chatId);

        return Boolean(context.timer);
    }

    initTimer(chatId, messageId) {
        const intervalId = setInterval(() => this.tickTimer(chatId), INTERVAL * 1000);

        const timer = {
            messageId,
            intervalId,
            leftTime: DEFAULT_LEFT_TIME,
        };

        const context = this.get(chatId);

        context.timer = timer;
    }

    tickTimer(chatId) {
        const { timer } = this.get(chatId);

        if (!timer) {
            console.log('No timer to tick', chatId);
        }

        timer.leftTime -= INTERVAL;

        if (timer.leftTime <= 0) {
            this.clearTimer(chatId);

            sendTimeoutMessage(chatId, timer);
        } else {
            updateTimerMessage(chatId, timer);
        }
    }

    clearTimer(chatId) {
        const context = this.get(chatId);

        if (context.timer) {
            clearInterval(context.timer.intervalId);

            delete context.timer;
        }
    }
}

export default Contexts;
