import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from './components/Orders';
import Pagination from './components/Pagination';
import Tableheader from './components/Tableheader';

const initialhost = 'https://trackingapp11.herokuapp.com/';

function App() {
  const [apiData, setData] = useState({
    data: [0],
    loading: false,
    pagesCount: 0,
  });
  const [paginateData, setPaginatedData] = useState([]);
  const [fetchError, setError] = useState(false);
  const [host, setHost] = useState(initialhost);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async function fetchData() {
      try {
        const res = await axios.get(host);

        setData((prevState) => {
          prevState = { ...prevState };
          setData((prevState) => ({
            ...prevState,
            data: res.data.orders,
            pagesCount: res.data.pagesCount,
          }));
          return prevState;
        });
      } catch (err) {
        setError(true);
        console.log(err);
      }
    })();
  }, [host]);
  const paginate = async () => {
    if (page < apiData.pagesCount) {
      setPage(page * 1 + 1);
      let state = { ...apiData };
      state = { ...state, loading: true };
      setData(state);

      try {
        const res = await axios.get(`${initialhost}?page=${page * 1 + 1}`);
        console.log('res', res);
        setData((prevState) => {
          prevState = { ...prevState };
          setData((prevState) => ({ ...prevState, data: res.data.orders }));
          return prevState;
        });
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setData((prevState) => ({ ...prevState, loading: false }));
      }
    }
  };

  useEffect(() => {}, [paginate > 0]);

  // update undelivered orders on screen
  async function updateStatus() {
    // get all undelivered orders
    setData((prevState) => {
      prevState = { ...prevState };
      prevState.data.map((value) => {
        if (value.status !== 'delivered') {
          value.status = 'loading...';
        }
        return value;
      });
      return prevState;
    });

    // preparing request body
    const idsToUpdate = apiData.data
      .filter((id) => {
        return id.status !== 'delivered';
      })
      .map((el) => {
        return {
          _id: el._id,
          tracking_number: el.tracking_number,
        };
      });

    // send requst to server
    const res = await axios.patch(initialhost + 'update', { idsToUpdate });

    // preparing new state
    console.log('loading in update', apiData);
    const apiDataU = { ...apiData };
    apiDataU.data.forEach((el) => {
      const elUpd = res.data.filter((elem) => elem._id === el._id);

      if (elUpd.length) {
        el.status = `${elUpd[0].status} upd`;
      }
    });

    setData((prevState) => {
      console.log('prevstate in update', prevState);
      if (prevState.loading) {
        return prevState;
      } else {
        return apiDataU;
      }
    });
  }
  return (
    <>
      {apiData ? (
        <Pagination
          setLoading={setLoading}
          setHost={setHost}
          initialhost={initialhost}
          apiData={apiData}
          page={page}
          setPage={setPage}
          paginate={paginate}
        />
      ) : (
        ''
      )}
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
          ) : apiData.data[0] === 0 ? (
            <tr>
              <td>Loading</td>
            </tr>
          ) : (
            apiData.data.map((el, index) => {
              return <Orders key={el._id} data={apiData.data} index={index} />;
            })
          )}
        </tbody>
      </table>
    </>
  );
}

export default App;
