import * as dotenv from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { ChatGPTAPIBrowser } from 'chatgpt';
dotenv.config();

// initialize chatGPT

const chat = new ChatGPTAPIBrowser({
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
  debug: process.env.DEBUG === 'true',
});
await chat.initSession();

// chat server

const app = fastify({ logger: true });
app.register(cors, { origin: '*' });

app.post('/sendMessage', async (request) => {
  const conversationId = request.body.conversationId;
  const parentMessageId = request.body.parentMessageId;
  const hasConvo = conversationId && parentMessageId;

  const result = await chat.sendMessage(
    request.body.message,
    hasConvo ? { conversationId, parentMessageId } : undefined
  );

  console.log('response:', result);
  return {
    message: {
      id: result.messageId,
      conversationId: result.conversationId,
      author: 'bot',
      text: result.response,
    },
  };
});

try {
  await app.listen({ port: 3456 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
