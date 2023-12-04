/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use client';

import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';

import { sendChatMessage } from '@/lib/api/chat';

import ChatInput from '@/components/chatbot/ChatInput';

import ChatBotHeader from './ChatBotHeader';
import ChatLaunch from './ChatLaunch';
import Message, { MessageProps } from './Message';

const ChatBot = () => {
  const chatboxRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messageList, setMessageList] = useState<MessageProps[]>([
    {
      message:
        'Xin chào! Tôi rất vui được giúp đỡ bạn. Nếu bạn có bất kỳ vấn đề nào liên quan đến luật pháp Việt Nam, tôi sẽ cố gắng giúp bạn. Bạn có thể đặt câu hỏi cụ thể hoặc chia sẻ vấn đề bạn đang gặp phải để tôi có thể hỗ trợ bạn tốt nhất có thể.',
      isUser: false,
    },
  ]);
  const [isChatting, setIsChatting] = useState(false);

  const sendMesasge = useMutation({
    mutationKey: ['sendMessage', inputText],
    mutationFn: sendChatMessage,
  });

  const toggle = () => {
    setOpen(!open);
  };

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (inputText === '') return;

    const newMessageList = [
      ...messageList,
      {
        message: inputText,
        isUser: true,
      },
    ];
    // show user message
    setMessageList(newMessageList);
    setInputText('');

    setIsChatting(true);

    const response = await sendMesasge.mutateAsync(newMessageList);
    newMessageList.push({
      message: response,
      isUser: false,
    });

    setMessageList(newMessageList);
    setIsChatting(false);
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
            <div className='flex h-[80vh] max-h-[80vh] min-w-[40vh] flex-col overflow-hidden rounded-2xl bg-white pb-4 shadow-lg sm:min-w-[450px]'>
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
                {isChatting && <Message message='Chatting...' />}
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
