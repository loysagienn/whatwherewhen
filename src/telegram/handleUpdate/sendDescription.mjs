import { sendRequest } from '../utils';
import { GET_QUESTION_KEYBOARD } from '../constants';

const sendDescription = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text: 'Этот бот присылает случайный вопрос',
        reply_markup: {
            keyboard: GET_QUESTION_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
};

export default sendDescription;
