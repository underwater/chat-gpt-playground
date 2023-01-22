import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { chat } from './chat';
import { Nav } from './nav';
import { cx, usePersistRef } from './util';

type Message = {
  author: 'user' | 'bot';
  text: string;
};

export function App() {
  const [conversationId, setConversationId] = usePersistRef('conversationId');
  const [parentMessageId, setParentMessageId] = usePersistRef('parentMessageId');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<Message>>([]);

  const { mutate, isLoading } = useMutation(chat.sendMessage, {
    onSuccess({ message }) {
      setConversationId(message.conversationId);
      setParentMessageId(message.id);
      appendMessage(message);
    },
  });

  const appendMessage = (message: Message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  };

  const sendMessage = () => {
    setInput('');
    appendMessage({ author: 'user', text: input });
    mutate({
      message: input,
      conversationId: conversationId.current,
      parentMessageId: parentMessageId.current,
    });
  };

  return (
    <div className='flex h-full flex-col overflow-hidden bg-gray-100'>
      <Nav />
      <main className='flex flex-1 flex-col items-center overflow-auto'>
        <MessageList messages={messages} />
      </main>
      <footer className='mb-8 flex flex-col items-center justify-center'>
        <div className='flex items-center justify-center text-sm text-gray-500'>
          {isLoading && 'loading...'}
        </div>
        <form className='mt-2 w-full max-w-4xl'>
          <textarea
            value={input}
            name='message'
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
              }
            }}
            rows={4}
            autoComplete='off'
            placeholder='Enter message...'
            className='w-full rounded-md border border-gray-300 focus:border-blue-400 focus:ring-blue-400'
          />
        </form>
      </footer>
    </div>
  );
}

type MessageListProps = {
  messages: Array<Message>;
};

function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <div className='flex w-full max-w-4xl flex-1 flex-col-reverse'>
        <div ref={endRef} />
        {messages.map((message, index) => (
          <div
            key={index}
            className={cx(
              'my-3 flex max-w-2xl flex-shrink-0 rounded-lg px-3 py-1.5',
              message.author === 'user' ? 'ml-auto bg-blue-200' : 'mr-auto bg-gray-300'
            )}
          >
            {message.text}
          </div>
        ))}
      </div>
    </>
  );
}
