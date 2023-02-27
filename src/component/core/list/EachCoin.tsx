import React, { useState, useEffect, useMemo } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import styled from 'styled-components';

const EachCoin = (props: { coinName: string; abbreviation: string }) => {
  // 실시간 가격
  const [price, setPrice] = useState<string>('');
  // 변화율의 절대값
  const [signedChangeRate, setSignedChangeRate] = useState<string>('');
  // 변화액의 절대값
  const [changePrice, setchangePrice] = useState<string>('');
  // 24시간 누적 거래대금
  const [accTradePrice24h, setAccTradePrice24h] = useState<string>('');
  // 타임 스탬프
  const [timestamp, setTimestamp] = useState<string>('');

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
          { type: 'ticker', codes: [props.abbreviation] },
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
            setPrice(message.trade_price.toLocaleString());
            setSignedChangeRate(
              String((message.signed_change_rate * 100).toFixed(2)) + '%'
            );
            setchangePrice(message.change_price);
            setAccTradePrice24h(
              Number(
                (message.acc_trade_price_24h / 1000000).toFixed()
              ).toLocaleString() + '백만'
            );
          }
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
  }, [props.abbreviation]);

  return (
    <React.Fragment>
      <CoinLogo title={props.abbreviation.substr(4)}>
        <div></div>
      </CoinLogo>
      <div className="column">
        <div className="name">{props.coinName}</div>
        <div>{props.abbreviation}</div>
      </div>
      <div
        className={
          signedChangeRate!.includes('-')
            ? 'right-sort negative'
            : 'right-sort positive'
        }
      >
        {price}
      </div>
      <div
        className={
          signedChangeRate!.includes('-')
            ? 'right-sort negative column'
            : 'right-sort positive column'
        }
      >
        <div>{signedChangeRate}</div>
        <div>
          {signedChangeRate!.includes('-') ? '-' + changePrice : changePrice}
        </div>
      </div>
      <div className="right-sort">{accTradePrice24h}</div>
    </React.Fragment>
  );
};

export default React.memo(EachCoin);
const CoinLogo = styled.div`
  width: 20px;
  height: 20px;
  background-size: cover;
  background-image: ${({ title }) =>
    `url(https://static.upbit.com/logos/${title}.png)`};
`;
