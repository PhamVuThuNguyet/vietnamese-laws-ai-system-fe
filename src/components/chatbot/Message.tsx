/**
 * Copyright (c) VKU.NewEnergy.
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import clsx from 'clsx';
import { motion } from 'framer-motion';

export type MessageProps = {
  message: string;
  isUser?: boolean;
  isLoading?: boolean;
};

const Message = ({
  message,
  isUser = false,
  isLoading = false,
}: MessageProps) => {
  return (
    <div className={clsx(isUser ? 'self-end pl-4' : ' self-start pr-4')}>
      <motion.div
        initial={{ opacity: 0, marginTop: 10 }}
        animate={{ opacity: 1, marginTop: 0 }}
        className={clsx(
          'flex min-h-[2rem] max-w-[300px] flex-row rounded-lg px-4 py-2',
          isUser
            ? 'text-primary items-end bg-gray-200/70 text-right'
            : // : isLoading
              // ? "border border-primary-400 bg-transparent text-primary-700"
              'flex flex-col items-start bg-blue-200/70 text-gray-700'
        )}
      >
        {!isUser && <p className='font-bold'>Vietnam Laws bot</p>}
        {isLoading ? (
          <div className='flex flex-row items-center space-x-1'>
            <div className='progress'></div>
            <div className='progress'></div>
            <div className='progress'></div>
          </div>
        ) : (
          <p className='text-start'>{message}</p>
        )}
      </motion.div>
    </div>
  );
};

export default Message;
