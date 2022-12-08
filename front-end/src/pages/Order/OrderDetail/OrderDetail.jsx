import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '../../../components/Navbar/Navbar';
import api from '../../../services/api';
import useCart from '../../../hooks/useCart';
import removeComma from '../../../utils/removeComma';

const dataid = {
  orderId: 'customer_order_details__element-order-details-label-order-id',
  sellerName: 'customer_order_details__element-order-details-label-seller-name',
  date: 'customer_order_details__element-order-details-label-order-date',
  status: 'customer_order_details__element-order-details-label-delivery-status<index>',
  buttonDelivery: 'customer_order_details__button-delivery-check',
  totalPrice: 'customer_order_details__element-order-total-price',

  itemId: 'customer_order_details__element-order-table-item-number',
  tableName: 'customer_order_details__element-order-table-name',
  tableQuantity: 'customer_order_details__element-order-table-quantity',
  tableUnit: 'ustomer_order_details__element-order-table-unit-price',
  tableTotal: 'customer_order_details__element-order-table-sub-total',
};

const title = [
  { id: 1, title: 'Item', align: 'center', width: '50px' },
  { id: 2, title: 'Descrição', align: 'center', width: '250px' },
  { id: 3, title: 'Quantidade', align: 'center', width: '80px' },
  { id: 4, title: 'Valor Unitário', align: 'center', width: '150px' },
  { id: 5, title: 'Sub-total', align: 'center', width: '80px' },
];

function OrderDetail() {
  const { id } = useParams();
  const { getProductById } = useCart();
  const [orders, setOrders] = React.useState({});
  const [sellers, setSellers] = React.useState([]);
  const [orderId, setOrderId] = React.useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchOrderId = React.useCallback(async () => {
    await api.get(`/sales/${id}`, {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      setOrderId(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    fetchOrderId();
  }, []);

  const fetchSellers = React.useCallback(async (sellerId) => {
    await api.get('/seller', {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      const findSeller = response.data.filter((item) => sellerId
        ?.toString().includes(item.id))[0];
      setSellers(findSeller);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const fetchOrders = React.useCallback(async () => {
    await api.get('/sales', {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      const findOrder = response.data.filter((item) => id.includes(item.id))[0] ?? [];
      setOrders(findOrder);
      fetchSellers(findOrder?.sellerId);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders && !sellers && !orderId) return null;

  const dateOrder = orders?.saleDate && new Date(orders?.saleDate);
  console.log(orderId);
  return (
    <>
      <Navbar />
      <div>
        <div>
          Pedido:
          <span
            data-testid={ dataid.orderId }
          >
            {orders?.id}
          </span>
        </div>
        <div>
          <span
            data-testid={ dataid.sellerName }
          >
            {sellers?.name}
          </span>
        </div>
        <div>
          <span
            data-testid={ dataid.date }
          >
            {orders?.saleDate && format(dateOrder, 'dd/MM/yyyy')}
          </span>
        </div>
        <div>
          <span
            data-testid={ dataid.status }
          >
            {orders?.status}
          </span>
        </div>
        <div>
          <button
            disabled
            type="button"
            data-testid={ dataid.buttonDelivery }
          >
            Marcar como entregue
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            {title.map((item) => (
              <th
                key={ item.id }
                align={ item.align }
                width={ item.width }
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orderId?.map((item, index) => (
            <tr key={ item.id }>
              <td data-testid={ `${dataid.itemId}-{index}` }>{ index + 1 }</td>
              <td data-testid={ `${dataid.tableName}-{index}` }>
                { getProductById(item.productId)?.name }
              </td>
              <td data-testid={ `${dataid.tableQuantity}-{index}` }>
                {item.quantity}
              </td>
              <td data-testid={ `${dataid.tableUnit}-{index}` }>
                { removeComma(getProductById(item.productId)?.price) }
              </td>
              <td data-testid={ `${dataid.tableTotal}-{index}` }>
                { removeComma(
                  Number(getProductById(item.productId)?.price).toFixed(2)
                   * item.quantity,
                ) }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <div>
          <span
            data-testid={ dataid.totalPrice }
          >
            {removeComma(orders?.totalPrice)}
          </span>
        </div>
      </div>
    </>

  );
}

export default OrderDetail;
