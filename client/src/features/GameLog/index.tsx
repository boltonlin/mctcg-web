import React, { useState } from 'react';
const { Socket } = require('socket.io-client');

type Props = {
  socket: typeof Socket;
};

export default function GameLog({ socket }: Props) {
  const [messageLog, setMessageLog] = useState('');

  socket.on('hello', (id: string) => {
    setMessageLog(`You are connected with id: ${id}`);
  });
  socket.on('log', (log: string) => {
    setMessageLog(messageLog.concat(`\n${log}`));
  });
  socket.on('update-perspective', (obj: any) => {
    setMessageLog(messageLog.concat(`\nLoaded perspective.`));
  });

  return (
    <textarea
      className="h-full self-center w-96 rounded-lg m-1 p-1 border-2
      border-white"
      value={messageLog}
      readOnly
    />
  );
}
