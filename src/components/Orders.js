import React from 'react';
function Orders(props) {
  return (
    <tr>
      <td>{props.data[props.index].order_number}</td>
      <td>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://t.17track.net/en#nums=${
            props.data[props.index].tracking_number
          }`}
        >
          {props.data[props.index].tracking_number}
        </a>
      </td>
      <td>{props.data[props.index].tracking_company}</td>
      <td>{props.data[props.index].country}</td>
      <td>{props.data[props.index].shipped}</td>
      <td className="status">{props.data[props.index].status}</td>
    </tr>
  );
}

export default Orders;
