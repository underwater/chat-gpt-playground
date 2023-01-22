import { http } from './util';

export type BotMessage = {
  author: 'bot';
  text: string;
  conversationId: string;
  id: string;
};

type SendMessageParams = {
  message: string;
  conversationId?: string;
  parentMessageId?: string;
};

async function sendMessage(params: SendMessageParams) {
  return http<{ message: BotMessage }>('sendMessage', {
    method: 'POST',
    body: params,
  });
}

export const chat = { sendMessage };
