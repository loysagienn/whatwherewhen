import { sendRequest } from '../utils';
import { GET_QUESTION_KEYBOARD, GET_QUESTION_COMMAND } from '../constants';

const text = `Этот бот выбирает случайный вопрос из базы вопросов «Что? Где? Когда?»
https://db.chgk.info/

Нажмите на кнопку "Показать вопрос" или отправьте боту команду ${GET_QUESTION_COMMAND}`;

const sendDescription = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text,
        reply_markup: {
            keyboard: GET_QUESTION_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
};

export default sendDescription;
