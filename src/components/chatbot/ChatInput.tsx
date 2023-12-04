/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { ArrowUpSquare } from 'lucide-react';
import { FormEvent } from 'react';

import IconButton from '@/components/buttons/IconButton';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  inputText: string;
  setInputText: (value: string) => void;
  onSendMessage: (e: FormEvent) => void;
}

const ChatInput = ({ inputText, setInputText, onSendMessage }: Props) => {
  return (
    <div className='relative flex h-fit max-h-[80px] items-center justify-center rounded-lg border py-2 pl-2 pr-12'>
      <Textarea
        id='user-input'
        placeholder='Type a message'
        value={inputText}
        className=' no-scrollbar resize-none break-words break-all border-none p-0 focus:border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 '
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && onSendMessage(e)}
      />
      <div className='absolute right-0 top-0 flex h-full justify-center'>
        <IconButton
          variant='ghost'
          icon={ArrowUpSquare}
          className='p-0 text-3xl '
        />
      </div>
    </div>
  );
};

export default ChatInput;
