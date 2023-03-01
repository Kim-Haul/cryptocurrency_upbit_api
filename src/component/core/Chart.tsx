import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

const Chart = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const searchKeyword = searchParams.get("coinName") || "";
  return (
    <Wrap>
      <div>{searchKeyword}</div>
    </Wrap>
  );
};

export default Chart;
const Wrap = styled.div`
  font-size: 1.6rem;
  padding: 1rem;
  font-weight: 700;
`;
