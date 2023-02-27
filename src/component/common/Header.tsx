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
          <div className="modal">
            <MdDashboardCustomize />
            <div className="modal-desc">
              <div className="modal-desc-title">제작자 컨택하기</div>
              <div className="modal-desc-content">
                <div className="content-left">
                  <img src="/images/qr_code.svg" alt="큐알코드" />
                </div>
                <div className="content-right">
                  <a
                    href="https://www.instagram.com/in.__ho/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <img src="/images/instagram.png" alt="큐알코드" />
                      인스타그램
                    </div>
                  </a>
                  <a
                    href="https://github.com/Kim-Haul/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <img src="/images/github.png" alt="큐알코드" />
                      깃허브
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
    gap: 10px;
    span {
      cursor: pointer;
    }
    .modal {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 50px;
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: #e1e1e1;
      }
      .modal-desc {
        display: none;
        cursor: default;
        &:hover {
          display: block;
        }
        position: absolute;
        background-color: #fff;
        border: 1px solid #e1e1e1;
        top: 60px;
        right: 0;
        width: 255px;
        height: 133px;
        color: #000;
        .modal-desc-title {
          background-color: #f8f8f8;
          border-bottom: 1px solid #e1e1e1;
          color: gray;
          padding: 7px;
        }
        .modal-desc-content {
          padding: 10px;
          display: flex;
          gap: 10px;
          .content-left {
            img {
              width: 80px;
              height: 80px;
            }
          }
          .content-right {
            display: flex;
            flex-direction: column;
            margin-top: 2px;
            gap: 12px;
            div {
              cursor: pointer;
              border: 1px solid #e1e1e1;
              color: gray;
              width: 120px;
              padding: 7px;
              display: flex;
              gap: 5px;
              img {
                width: 15px;
                height: 15px;
              }
              &:hover {
                background-color: rgba(0, 123, 255, 0.1);
                color: #35a3dc;
              }
            }
          }
        }
      }
      &:hover {
        .modal-desc {
          display: block;
        }
      }
    }
  }
`;
