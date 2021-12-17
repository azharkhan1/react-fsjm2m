import React from 'react';
function Tableheader() {
  return (
    <thead>
      <tr className="table-head">
        <th>Order number</th>
        <th>Tracking number</th>
        <th>Carrier</th>
        <th>Country</th>
        <th>Shipping date</th>
        <th>Status</th>
      </tr>
    </thead>
  );
}
export default Tableheader;
