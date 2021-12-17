import React, { useState } from 'react';

function Pagination({ setHost, initialhost, apiData }) {
  const [page, setPage] = useState(1);
  const [isPagination, setIsPagination] = useState(false);
  return (
    <div style={{ margin: 'auto', width: '178px' }}>
      <div
        style={{ cursor: 'pointer' }}
        className="navel"
        onClick={() => {
          if (page > 1) {
            setHost(`${initialhost}?page=${page - 1}`);
            setPage(page - 1);
          }
        }}
      >
        ◁
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setHost(`${initialhost}?page=${page}`);
        }}
      >
        <input
          className="navel"
          type="number"
          min="1"
          max={apiData.pagesCount}
          value={page}
          onChange={function (e) {
            e.preventDefault();
            setPage(e.target.value);
          }}
        />
      </form>
      <div className="navel">/ {apiData.pagesCount}</div>
      <div
        style={
          isPagination
            ? { cursor: 'pointer', backgroundColor: 'red' }
            : { backgroundColor: 'blue' }
        }
        className="navel"
        onClick={() => {
          if (page < apiData.pagesCount) {
            setHost(`${initialhost}?page=${page * 1 + 1}`);
            setPage(page * 1 + 1);
            setIsPagination(true);
          }
        }}
      >
        ▷
      </div>
    </div>
  );
}

export default Pagination;
