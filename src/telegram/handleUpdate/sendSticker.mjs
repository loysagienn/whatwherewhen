import { getDateDay } from 'app/utils/date';
import { sendRequest } from '../utils';
import { logMessage } from '../logger';

const sendSticker = async (context, chatId, sender, questionId) => {
    try {
        const random = Math.random();

        if (random < 0.8) {
            return;
        }

        const { activeQuestionId, owlStickerDateDay } = await context.db.getChatContext(chatId);

        if (activeQuestionId !== questionId) {
            return;
        }

        const currentDateDay = getDateDay();

        if (currentDateDay === owlStickerDateDay) {
            logMessage(`Не отправляем ${sender} стикер с совой, сегодня уже отправляли`);

            return;
        }

        const stickerBody = {
            chat_id: chatId,
            sticker: context.owlStickerId,
            disable_notification: true,
        };

        await sendRequest('sendSticker', { body: stickerBody, method: 'POST' });

        await context.db.setChatContext(chatId, {
            owlStickerDateDay: currentDateDay,
        });

        logMessage(`Отправили ${sender} стикер с совой`);
    } catch (error) {
        logMessage(`Ошибка при отправке стикера с совой ${sender}:\n${error.message}`);
    }
};

export default sendSticker;
