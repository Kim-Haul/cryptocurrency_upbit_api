import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EachCoin from './EachCoin';

const ListDetail = (props: { searchInput: string }) => {
  // 코인 목록 조회 API
  const getCoinList = async () => {
    try {
      const res = await axios.get(
        'https://api.upbit.com/v1/market/all?isDetails=false'
      );
      return res;
    } catch (err) {
      console.log('코인 목록을 불러오는데 실패했습니다.');
    }
  };
  // 코인 목록 조회 쿼리
  const { data: getCoinListQuery } = useQuery(
    ['getCoinListQuery'],
    getCoinList,
    {
      refetchOnWindowFocus: false,
      onSuccess: () => {},
      onError: () => {
        console.log('코인 목록을 불러오는데 실패했습니다.');
      },
    }
  );
  // 인터페이스의 정의
  interface ICoinList {
    market: string;
    korean_name: string;
    english_name: string;
  }

  // 코인 목록 필터링 (원화시장)
  const FiterCoinList = useMemo(() => {
    return getCoinListQuery?.data.filter(
      (v: ICoinList) => v.market.substr(0, 3) === 'KRW'
    );
  }, [getCoinListQuery?.data]);

  // 소켓 연결을 위해 원화시장에서 해당하는 코인명(code)만 가져오기
  const coinNameList = FiterCoinList.map((v: ICoinList) => v.market);
  // 배열 안에 문자열 꺼내기 -> 코인 초기 시세 조회 REST api 쿼리 파라미터를 위함.
  const coinInitPrice = coinNameList.join();

  // 소켓 response 타입 및 인터페이스 정의
  type RequestType = 'ticker' | 'orderbook' | 'trade';
  type ChangeType = 'RISE' | 'EVEN' | 'FALL';
  type OrderType = 'ASK' | 'BID';
  type MarketStateType = 'PREVIEW' | 'ACTIVE' | 'DELISTED';
  type MarketWarningType = 'NONE' | 'CAUTION';
  type StreamType = 'SNAPSHOT' | 'REALTIME';

  interface ITicker {
    type: RequestType;
    code: string;
    opening_price: number;
    high_price: number;
    low_price: number;
    trade_price: number;
    prev_closing_price: number;
    acc_trade_price: number;
    change: ChangeType;
    change_price: number;
    signed_change_price: number;
    change_rate: number;
    signed_change_rate: number;
    ask_bid: OrderType;
    trade_volume: number;
    acc_trade_volume: number;
    trade_date: string;
    trade_time: string;
    trade_timestamp: number;
    acc_ask_volume: number;
    acc_bid_volume: number;
    highest_52_week_price: number;
    highest_52_week_date: string;
    lowest_52_week_price: number;
    lowest_52_week_date: string;
    market_state: MarketStateType;
    is_trading_suspended: false;
    delisting_date?: Date;
    market_warning: MarketWarningType;
    timestamp: number;
    acc_trade_price_24h: number;
    acc_trade_volume_24h: number;
    stream_type: StreamType;
    market?: string;
  }

  // 코인 초기 시세 조회 API
  const getInitPrice = async () => {
    try {
      const res = await axios.get(
        `https://api.upbit.com/v1/ticker?markets=${coinInitPrice}`
      );
      return res;
    } catch (err) {
      console.log('코인 초기 시세를 불러오는데 실패했습니다.');
    }
  };

  // 소켓 통신으로 받아오는 값 저장
  // 렌더링을 위해 setState 로 관리
  const [initialState, setInitialState] = useState<ITicker[]>([]);

  useEffect(() => {
    async function initialPrice() {
      const data = await getInitPrice();
      setInitialState(data?.data);
    }

    initialPrice();

    // WebSocket 연결
    const ws = new W3CWebSocket('wss://api.upbit.com/websocket/v1');

    // WebSocket 이벤트 핸들러
    ws.onopen = () => {
      console.log('WebSocket 연결됨');
      // 원하는 코인의 시세 구독
      ws.send(
        JSON.stringify([
          { ticket: 'SUPER_BIT_UNIQUE_TICKET' },
          { type: 'ticker', codes: coinNameList },
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
            const socketResponse = [message];
            const TempList = socketResponse.map((obj: any) => {
              return { ...obj, market: obj.code };
            });

            // 상태 업데이트
            setInitialState((prev) => {
              // 기존 값을 순회하면서 변경값을 업데이트
              const map = new Map(prev.map((item) => [item.market, item]));
              TempList.forEach((item: any) =>
                map.set(item.market, { ...map.get(item.market), ...item })
              );
              const result = Array.from(map.values());
              return result;
            });
          }
        });
      } else {
        // 문자열일 경우
        const message = JSON.parse(data);
        if (message.type === 'ticker') {
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

  return (
    <Wrap>
      {initialState.map((v: any, i: number) => {
        return (
          <div className="price" key={i}>
            <EachCoin
              abbreviation={v.market}
              coinNameList={coinNameList}
              // 실시간 가격
              price={v.trade_price}
              // 부호가 있는 변화율
              signedChangeRate={v.signed_change_rate}
              // 변화액의 절대값
              changePrice={v.change_price}
              // 24시간 누적 거래대금
              accTradePrice24h={v.acc_trade_price_24h}
              // 주문 타입 (매도&매수)
              askBid={v.ask_bid}
            />
          </div>
        );
      })}
    </Wrap>
  );
};

export default ListDetail;
const Wrap = styled.div`
  height: 1007px;
  overflow: auto;
  // 스크롤바 커스텀
  &::-webkit-scrollbar-thumb {
    background: #217af4;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
  .price {
    display: grid;
    padding-left: 10px;
    padding-right: 10px;
    grid-template-columns: 0.5fr 1.1fr 1fr 1fr 1.2fr;
    border-bottom: 1px solid #e1e1e1;
    align-items: center;
    height: 45px;
    font-size: 1.2rem;
    .column {
      display: flex;
      flex-direction: column;
      .name {
        font-weight: 700;
      }
    }
    .right-sort {
      text-align: right;
      padding-right: 15px;
    }
    .right-sort.positive {
      color: #c84a31;
      font-weight: 500;
    }
    .right-sort.negative {
      color: #1261c4;
      font-weight: 500;
    }
    &:hover {
      background: rgba(33, 122, 244, 0.1);
    }
  }
`;
