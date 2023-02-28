import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import ListDetail from './ListDetail';

const List = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  return (
    <Wrap>
      <Search>
        <div className="input-box">
          <input
            type="text"
            placeholder="코인명(영문)/심볼 검색"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <div className="search-icon">
          <AiOutlineSearch />
        </div>
      </Search>
      <Title>
        <div>한글명</div>
        <div>현재가</div>
        <div>상승률</div>
        <div>거래대금</div>
      </Title>
      <ListDetail searchInput={searchInput} />
    </Wrap>
  );
};

export default List;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 1.4rem;
`;
const Search = styled.div`
  height: 45px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  .input-box {
    width: 87%;
    input {
      width: 100%;
      height: 100%;
      padding: 10px;
      font-size: 1.4rem;
      border: none;
      &:focus {
        border: 2px solid rgb(0, 123, 255);
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        outline: none;
      }
    }
  }
  .search-icon {
    width: 13%;
    border-left: 1px solid #e1e1e1;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2.2rem;
      color: #093687;
      cursor: pointer;
    }
  }
`;
const Title = styled.div`
  display: grid;
  height: 45px;
  border-bottom: 1px solid #e1e1e1;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  padding-right: 10px;
  padding-left: 5px;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
