import axios from 'axios';

import { MessageProps } from '@/components/chatbot/Message';

import { aiBaseUrl } from '@/constant/env';

export const sendChatMessage = async (messageList: MessageProps[]) => {
  const url = `${aiBaseUrl}/chat`;

  const messages = messageList.map(({ message, isUser }) => ({
    content: message,
    role: isUser ? 'user' : 'bot',
  }));

  const response = await axios.post(url, { messages });
  return response.data;
};
