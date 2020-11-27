import { BOT_CHATS } from '../collections';

const getDefaultContext = (chatId) => ({
    chatId,
});

export const getChatContext = (db) => (chatId) => db
    .collection(BOT_CHATS)
    .findOne({ chatId })
    .then((chatContext) => chatContext || getDefaultContext(chatId));

export const setChatContext = (db) => async (chatId, chatContext) => {
    const existingContext = await db.collection(BOT_CHATS).findOne({ chatId });

    if (existingContext) {
        const updateContext = { ...existingContext, ...chatContext, chatId };

        return db.collection(BOT_CHATS).updateOne({ chatId }, { $set: updateContext });
    }

    return db.collection(BOT_CHATS).insertOne({ ...chatContext, chatId });
};
