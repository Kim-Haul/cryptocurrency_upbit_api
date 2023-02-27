import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EachCoin from './EachCoin';

const ListDetail = () => {
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
      (v: any) => v.market.substr(0, 3) === 'KRW'
    );
  }, [getCoinListQuery?.data]);

  return (
    <Wrap>
      {FiterCoinList.map((v: ICoinList, i: number) => {
        return (
          <div className="price" key={i}>
            <EachCoin coinName={v.korean_name} abbreviation={v.market} />
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
    grid-template-columns: 0.5fr 1.1fr 1fr 1fr 1fr;
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
      color: red;
    }
    .right-sort.negative {
      color: blue;
    }
  }
`;
