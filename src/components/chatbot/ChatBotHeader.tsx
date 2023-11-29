/* eslint-disable @next/next/no-img-element */
const ChatBotHeader = ({ onCloseChatBot }: { onCloseChatBot: () => void }) => {
  return (
    <div className='bg-primary text-primary-foreground flex h-20 items-center justify-between px-8'>
      <div className='flex flex-row items-center space-x-2'>
        {/* <img
          src='https://placehold.co/128x128'
          className='h-10 w-10 rounded-full'
        /> */}
        <p className='text-xl font-medium'>Hi there</p>
        <img
          width={32}
          src='https://cdnjs.cloudflare.com/ajax/libs/twemoji/12.1.1/72x72/1f44b.png'
          alt=''
        />
      </div>
      <button
        id='close-chat'
        onClick={onCloseChatBot}
        className='group relative h-14 w-14 overflow-hidden rounded-full '
      >
        <div className='bg-primary-foreground/20 absolute left-[50%] top-[50%] h-14 w-14  translate-x-[-50%] translate-y-[-50%] scale-0 transition-all group-hover:scale-100'></div>
        <div className='absolute left-[50%] top-[50%] z-10 translate-x-[-50%] translate-y-[-50%]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='text-primary-foreground h-8 w-8 fill-white'
            viewBox='0 0 256 256'
            stroke='currentColor'
          >
            <path d='M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z'></path>
            {/* <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path> */}
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ChatBotHeader;
