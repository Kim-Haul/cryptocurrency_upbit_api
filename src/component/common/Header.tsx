import React from 'react';
import styled from 'styled-components';
import { MdDashboardCustomize } from 'react-icons/md';

const Header = () => {
  return (
    <Wrap>
      <Frame>
        <div className="header-left">
          <span className="title">SUPER BIT</span>
        </div>
        <div className="header-right">
          <span>로그아웃</span>
          <MdDashboardCustomize />
          <div className="modal">안녕하세요</div>
        </div>
      </Frame>
    </Wrap>
  );
};

export default Header;
const Wrap = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #093687;
`;
const Frame = styled.div`
  width: 1400px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  color: #fff;
  .header-left {
    font-size: 2.2rem;
    font-weight: 700;
  }
  .header-right {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    gap: 30px;
    span {
      cursor: pointer;
    }
    svg {
      font-size: 2rem;
      color: #e1e1e1;
      cursor: pointer;
    }
    .modal {
      position: absolute;
      background-color: #fff;
      border: 1px solid #e1e1e1;
      top: 60px;
      right: 0;
      width: 255px;
      height: 200px;
      padding: 1rem;
    }
  }
`;
