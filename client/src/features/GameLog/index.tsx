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
      className="h-[98vh] w-80 overflow-auto"
      value={messageLog}
      readOnly
    />
  );
}
