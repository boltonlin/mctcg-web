import React, { useEffect, useState } from 'react';
import { Card } from '../../../../common/index';

type Props = {
  card: Card;
};

export default function FocusCard({ card }: Props) {
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
    <div className="flex flex-col">
      {card?.originalInfo?.imagesrc && (
        <img src={`https://marvelcdb.com${card.originalInfo.imagesrc}`} />
      )}
      <div
        className="w-[300px] h-full"
        dangerouslySetInnerHTML={{
          __html: info,
        }}
      ></div>
    </div>
  );
}
