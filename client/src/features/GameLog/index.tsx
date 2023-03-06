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
  socket.on('print-log', (log: string) => {
    setMessageLog(messageLog.concat(`\n${log}`));
  });
  socket.on('update-perspective', (obj: any) => {
    setMessageLog(messageLog.concat(`\n${JSON.stringify(obj, null, 2)}`));
  });

  return (
    <div>
      <textarea cols={50} rows={10} value={messageLog} readOnly></textarea>
    </div>
  );
}
