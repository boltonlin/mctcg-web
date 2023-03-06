import React, { useEffect, useState } from 'react';
import { Card } from '../../../../common/index';

type Props = {
  card: Card;
  commands: string[];
};

export default function Control({ card, commands }: Props) {
  const [info, setInfo] = useState('');

  const renderHtml = (): string => {
    const info = card?.originalInfo;
    let str = '';
    str += `Cost: ${info?.cost !== undefined ? info.cost : ''}<br>`;
    str += `<u>${info?.title}</u><br>`;
    str += `${info?.ctype}<br>`;
    str += `<b>${info?.traits !== undefined ? info.traits : ''}</b><br>`;
    str += `${info?.text}<br>`;
    str += `<i>${info?.flavorText}</i><br>`;
    return str;
  };

  useEffect(() => {
    setInfo(renderHtml());
  }, [card]);
  return (
    <div className="flex flex-col justify-center">
      <div>
        {card?.originalInfo?.imagesrc && (
          <img src={`https://marvelcdb.com${card.originalInfo.imagesrc}`} />
        )}
      </div>
      <div
        className="w-[300px]"
        dangerouslySetInnerHTML={{
          __html: info,
        }}
      ></div>
      <div className="bg-[#0030C3] h-96 w-full text-white font-mono text-5xl flex flex-col justify-evenly border-white border-4">
        {commands.map((command) => (
          <div>{command}</div>
        ))}
      </div>
    </div>
  );
}
