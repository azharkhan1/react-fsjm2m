import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from './components/Orders';
import Pagination from './components/Pagination';
import Tableheader from './components/Tableheader';

const initialhost = 'https://trackingapp11.herokuapp.com/';

function App() {
  const [apiData, setData] = useState([0]);
  const [fetchError, setError] = useState(false);
  const [host, setHost] = useState(initialhost);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await axios.get(host);
        setData(res.data);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    })();
  }, [host]);

  async function updateStatus() {
    setLoading(false);
    setData((prevState) => {
      prevState = { ...prevState };
      prevState.orders.map((value) => {
        if (value.status !== 'delivered') {
          value.status = 'loading...';
        }
        return value;
      });
      return prevState;
    });

    const idsToUpdate = apiData.orders
      .filter((id) => {
        return id.status !== 'delivered';
      })
      .map((el) => {
        return {
          _id: el._id,
          tracking_number: el.tracking_number,
        };
      });

    if (!loading) {
      const res = await axios.patch(initialhost + 'update', { idsToUpdate });
      console.log('condition matched it updated', loading);
      const apiDataU = { ...apiData };
      apiDataU.orders.forEach((el) => {
        const elUpd = res.data.filter((elem) => elem._id === el._id);

        if (elUpd.length) {
          el.status = `${elUpd[0].status} upd`;
        }
      });
      if (!loading) {
        setData(apiData);
      }
    } else {
      console.log('not matched');
    }
  }

  return (
    <>
      <div
        onClick={updateStatus}
        style={{ float: 'right', margin: '20px', cursor: 'pointer' }}
      >
        Update
      </div>
      <table style={{ width: '100%', margin: '10px' }}>
        <Tableheader />
        <tbody>
          {fetchError ? (
            <p>Error fetching data</p>
          ) : apiData[0] === 0 ? (
            <tr>
              <td>Loading</td>
            </tr>
          ) : (
            apiData.orders.map((el, index) => {
              return (
                <Orders key={el._id} data={apiData.orders} index={index} />
              );
            })
          )}
        </tbody>
      </table>
      {apiData ? (
        <Pagination
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          setHost={setHost}
          initialhost={initialhost}
          apiData={apiData}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default App;
