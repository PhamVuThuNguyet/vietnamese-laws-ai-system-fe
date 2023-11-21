'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';

import ChatInput from '@/components/chatbot/ChatInput';

import ChatBotHeader from './ChatBotHeader';
import ChatLaunch from './ChatLaunch';
import Message, { MessageProps } from './Message';

const ChatBot = () => {
  const chatboxRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messageList, setMessageList] = useState<MessageProps[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  const onSendMessage = async (e: unknown) => {
    e.preventDefault();
    if (inputText === '') return;

    setMessageList((msgs) => [
      ...msgs,
      {
        message: inputText,
        isUser: true,
      },
    ]);
    setInputText('');
    setIsChatting(true);
    const answer = 'this is response';

    setIsChatting(false);
    setMessageList((msgs) => [
      ...msgs,
      {
        message: answer,
        isUser: false,
      },
    ]);
  };

  useEffect(() => {
    if (!chatboxRef.current) return;
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messageList]);

  return (
    <Fragment>
      {!open && (
        <ChatLaunch open={open} onClick={open ? onSendMessage : toggle} />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            id='chat-container'
            className='fixed bottom-4'
            initial={{ bottom: '1rem', right: '1.5rem', opacity: 0 }}
            animate={{ right: '2rem', opacity: 1 }}
            exit={{ right: '1.5rem', opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className='flex h-[80vh] max-h-[80vh] min-w-[40vh] flex-col overflow-hidden rounded-2xl bg-white pb-4 shadow-lg sm:min-w-[380px]'>
              <ChatBotHeader onCloseChatBot={() => setOpen(false)} />

              <div
                id='chatbox'
                ref={chatboxRef}
                className='ml-8 mr-6 flex flex-1 flex-col space-y-2 overflow-y-auto py-8 pr-2'
              >
                {messageList.map((message, index) => (
                  <Message
                    key={index}
                    message={message.message}
                    isUser={message.isUser}
                  />
                ))}
                {isChatting && (
                  <Message message='Chatting...' isLoading={true} />
                )}
              </div>

              <form action={undefined}>
                <div className='ml-8 mr-6 pr-2'>
                  <ChatInput
                    inputText={inputText}
                    setInputText={setInputText}
                    onSendMessage={onSendMessage}
                  />
                </div>
                <button
                  type='submit'
                  onClick={onSendMessage}
                  className='hidden'
                ></button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default ChatBot;
