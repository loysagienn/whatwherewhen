import { BOT_CHATS } from '../collections';

const getDefaultContext = (chatId) => ({
    chatId,
    questionIndex: 1,
});

export const getChatContext = (db) => (chatId) => db
    .collection(BOT_CHATS)
    .findOne({ chatId })
    .then((chatContext) => chatContext || getDefaultContext(chatId));

export const setChatContext = (db) => async (chatContext) => {
    const { chatId } = chatContext;

    const existingContext = await db.collection(BOT_CHATS).findOne({ chatId });

    if (existingContext) {
        return db.collection(BOT_CHATS).updateOne({ chatId }, { $set: chatContext });
    }

    return db.collection(BOT_CHATS).insertOne(chatContext);
};
