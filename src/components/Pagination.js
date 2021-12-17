import React, { useState } from 'react';

function Pagination({
  setHost,
  initialhost,
  apiData,
  page,
  setPage,
  paginate,
}) {
  // console.log('pagination: ', page, apiData);
  return (
    <div style={{ margin: 'auto', float: 'right', width: '178px' }}>
      <div
        style={{
          cursor: 'pointer',
          // position: 'relative',
          // bottom: 42,
          // left: 150,
        }}
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
        style={{
          cursor: 'pointer',
          // position: 'relative',
          // bottom: 42,
          // left: 150,
        }}
        className="navel"
        onClick={paginate}
      >
        ▷
      </div>
    </div>
  );
}

export default Pagination;
