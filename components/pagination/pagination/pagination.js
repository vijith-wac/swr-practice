"use client";

import { useEffect, useState } from "react";
import Page from "./page";

const Pagination = () => {
  const [pageIndex, setPageIndex] = useState(1);
  let length = 10;

  return (
    <div>
      <h2>Normal Pagination</h2>
      <Page pageIndex={pageIndex} length={length} />
      <div style={{ display: 'none' }}><Page pageIndex={pageIndex + 1} length={length}/></div>
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
