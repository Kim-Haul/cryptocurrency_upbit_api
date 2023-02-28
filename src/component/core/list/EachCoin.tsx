import React from 'react';
import styled, { css } from 'styled-components';

const EachCoin = (props: {
  abbreviation: string;
  coinNameList: string[];
  price: string;
  signedChangeRate: number;
  changePrice: string;
  accTradePrice24h: number;
  askBid: string;
}) => {
  // 현재 거래 가격
  const price = props.price.toLocaleString();
  // 부호가 있는 변화율 (%)
  const signedChangeRate = String((props.signedChangeRate * 100).toFixed(2)) + '%';
  // 변화액의 절대값
  const changePrice = props.changePrice.toLocaleString();
  // 24시간 누적 거래대금
  const accTradePrice24h = Number((props.accTradePrice24h / 1000000).toFixed()).toLocaleString() + '백만';
  // 주문 타입 (매도&매수)
  const askBid = props.askBid;

  return (
    <React.Fragment>
      <CoinLogo title={props.abbreviation.substr(4)}>
        <div className="img"></div>
      </CoinLogo>
      <div className="column">
        <div className="name">{props.abbreviation.substr(4)}</div>
        <div>{props.abbreviation}</div>
      </div>
      {/* 현재가 */}
      <div
        className={
          signedChangeRate!.includes('-')
            ? 'right-sort negative'
            : 'right-sort positive'
        }
      >
        {price}
      </div>
      {/* 상승률 */}
      <Alarm
        className={
          signedChangeRate!.includes('-')
            ? 'right-sort negative column'
            : 'right-sort positive column'
        }
        askBid={askBid}
      >
        <div>{signedChangeRate}</div>
        <div>
          {signedChangeRate!.includes('-') ? '-' + changePrice : changePrice}
        </div>
      </Alarm>
      <div className="right-sort">{accTradePrice24h}</div>
    </React.Fragment>
  );
};

export default React.memo(EachCoin);
const CoinLogo = styled.div`
  width: 20px;
  height: 20px;
  background-size: cover;
  background-image: ${(props: { title: string }) =>
    `url(https://static.upbit.com/logos/${props.title}.png)`};
`;
const Alarm = styled.div`
  border: 1px solid transparent;
  ${(props: { askBid: string }) =>
    props.askBid &&
    (props.askBid === 'ASK'
      ? css`
          animation: disappearBlue 0.6s;
        `
      : css`
          animation: disappearRed 0.6s;
        `)};
  @keyframes disappearBlue {
    0% {
      border-color: #1261c4;
    }
    100% {
      border-color: #1261c4;
    }
  }
  @keyframes disappearRed {
    0% {
      border-color: #c84a31;
    }
    100% {
      border-color: #c84a31;
    }
  }
`;
