import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const ChatLaunch = ({ open, onClick }: any) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      className='fixed bottom-4 right-4 z-10 mb-6 mr-4 select-none'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={cn(
          'bg-gradient shadow-primary-400 hover:bg-primary-600 flex h-16 w-16 items-center justify-center rounded-full shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] transition-all duration-300 ease-in-out hover:cursor-pointer'
        )}
      >
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              exit={{ x: 10 }}
            >
              <motion.svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                // fill='#f2f2f2'
                className='fill-primary'
                viewBox='0 0 256 256'
              >
                <path d='M232,127.89a16,16,0,0,1-8.18,14L55.91,237.9A16.14,16.14,0,0,1,48,240a16,16,0,0,1-15.05-21.34L60.3,138.71A4,4,0,0,1,64.09,136H136a8,8,0,0,0,8-8.53,8.19,8.19,0,0,0-8.26-7.47H64.16a4,4,0,0,1-3.79-2.7l-27.44-80A16,16,0,0,1,55.85,18.07l168,95.89A16,16,0,0,1,232,127.89Z'></path>
              </motion.svg>
            </motion.div>
          ) : (
            <motion.svg
              initial={{ x: -10, opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0.5 }}
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              // fill='#f2f2f2'
              className='fill-primary'
              viewBox='0 0 256 256'
            >
              <path d='M232,64V192a16,16,0,0,1-16,16H82.5L50.42,236.11a.69.69,0,0,1-.13.11A15.89,15.89,0,0,1,40,240a16.05,16.05,0,0,1-6.79-1.52A15.84,15.84,0,0,1,24,224V64A16,16,0,0,1,40,48H216A16,16,0,0,1,232,64Z'></path>
            </motion.svg>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ width: 0, height: 0, offsetAnchor: 'center' }}
        animate={hover ? { width: 64, height: 64 } : {}}
        transition={{ duration: 0.2 }}
        className={cn(
          'shadow-primary-400 bg-primary absolute inset-0 left-[50%] top-[50%] flex h-16 w-16 translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full shadow-[0px_7px_29px_0px_rgba(0,0,0,0.3)] hover:cursor-pointer'
        )}
      >
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          initial={{ width: 0, height: 0 }}
          animate={hover ? { width: 30, height: 30 } : {}}
          className='fill-primary-foreground'
          viewBox='0 0 256 256'
        >
          <motion.path
            initial={{ x: 30, opacity: 0 }}
            animate={open ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
            d='M232,127.89a16,16,0,0,1-8.18,14L55.91,237.9A16.14,16.14,0,0,1,48,240a16,16,0,0,1-15.05-21.34L60.3,138.71A4,4,0,0,1,64.09,136H136a8,8,0,0,0,8-8.53,8.19,8.19,0,0,0-8.26-7.47H64.16a4,4,0,0,1-3.79-2.7l-27.44-80A16,16,0,0,1,55.85,18.07l168,95.89A16,16,0,0,1,232,127.89Z'
          ></motion.path>
          {!open && (
            <motion.path d='M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM192,108.68,147.31,64l24-24L216,84.68Z'></motion.path>
          )}
        </motion.svg>
      </motion.div>
    </motion.div>
  );
};

export default ChatLaunch;
