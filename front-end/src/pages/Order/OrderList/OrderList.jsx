import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import OrderItem from '../../../components/OrderItem/OrderItem';
import api from '../../../services/api';

function OrderList() {
  const [orders, setOrders] = React.useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrders = React.useCallback(async () => {
    await api.get('/sales', {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      setOrders(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      {orders?.map((order) => (
        <OrderItem
          key={ order?.id }
          orderId={ order?.id }
          status={ order?.status }
          date={ order?.saleDate }
          price={ order?.totalPrice }
        />
      ))}
    </>

  );
}

export default OrderList;
