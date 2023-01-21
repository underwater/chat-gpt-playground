import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className='flex h-screen flex-col'>
      <Nav />
      <main className='flex flex-1 justify-center bg-gray-100'>
        <div className='my-8 flex max-w-5xl flex-1 flex-col'>
          <div className='flex flex-1 flex-col-reverse bg-gray-300'>
            <div>chat goes here</div>
            <div>chat goes here</div>
            <div>chat goes here</div>
          </div>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder='Enter message...'
            type='text'
            className='mt-2 w-full rounded-md border border-gray-300'
          />
        </div>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className='flex h-14 items-center justify-center bg-gray-800'>
      <span className='text-sm font-medium text-gray-300'>OrionGPT</span>
    </nav>
  );
}

export default App;
