import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const ListDetail = () => {
  const [price, setPrice] = useState<number | null>(null);

  const options = { method: 'GET', headers: { accept: 'application/json' } };

  fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
    .then((response) => response.json())
    .then((response) =>
      console.log(response.filter((v: any) => v.market.substr(0, 3) === 'KRW'))
    )
    .catch((err) => console.error(err));

  useEffect(() => {
    // WebSocket 연결
    const ws = new W3CWebSocket('wss://api.upbit.com/websocket/v1');

    // WebSocket 이벤트 핸들러
    ws.onopen = () => {
      console.log('WebSocket 연결됨');
      // 원하는 코인의 시세 구독
      ws.send(
        JSON.stringify([
          { ticket: 'SUPER_BIT_UNIQUE_TICKET' },
          { type: 'ticker', codes: ['KRW-BTC'] },
        ])
      );
    };

    ws.onmessage = (event: any) => {
      const data = event.data;
      if (typeof data !== 'string') {
        // Blob 형태일 경우
        // Blob 객체의 arrayBuffer() 메서드를 사용하여 ArrayBuffer 형태의 데이터로 변환한 후, 이를 가공하여 사용
        data.arrayBuffer().then((buffer: any) => {
          const message = JSON.parse(new TextDecoder('utf-8').decode(buffer));
          if (message.type === 'ticker') {
            setPrice(message.trade_price);
          }
          console.log(message);
        });
      } else {
        // 문자열일 경우
        const message = JSON.parse(data);
        if (message.type === 'ticker') {
          setPrice(message.trade_price);
        }
      }
    };

    ws.onerror = (error: any) => {
      console.error('WebSocket 오류 발생:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket 연결 종료됨');
    };

    // 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      ws.close();
    };
  }, []);

  return <div>{price ? `BTC 가격: ${price}` : '로딩 중...'}</div>;
};

export default ListDetail;
const Wrap = styled.div``;
