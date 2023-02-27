import React from 'react';
import styled from 'styled-components';

// 컴포넌트 임포트
import Chart from '../component/core/Chart';
import List from '../component/core/list/List';
import Trade from '../component/core/Trade';

const Dashboard = () => {
  return (
    <Wrap>
      <div className="main-left">
        <Chart />
        <Trade />
      </div>
      <div className="main-right">
        <List />
      </div>
    </Wrap>
  );
};

export default Dashboard;
const Wrap = styled.div`
  display: flex;
  gap: 10px;
  .main-left {
    width: 990px;
    height: 1920px;
    border: 1px solid red;
  }
  .main-right {
    width: 400px;
    height: 1097px;
  }
`;
