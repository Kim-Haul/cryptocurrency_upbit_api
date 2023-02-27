import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </React.Fragment>
  );
};

export default Layout;
const Main = styled.main`
  width: 1400px;
  margin: 0 auto;
  background-color: #e9edf3;
  width: 100%;
  height: 100vh;
`;
