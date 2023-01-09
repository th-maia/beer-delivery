import React from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Navbar from '../../../components/Navbar/Navbar';
import api from '../../../services/api';
import removeComma from '../../../utils/removeComma';
import './OrderDetail.css';

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
  tableUnit: 'customer_order_details__element-order-table-unit-price',
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
  const [orders, setOrders] = React.useState({});
  const [sellers, setSellers] = React.useState([]);
  const [statusOrder, setStatusOrder] = React.useState('Pendente');
  const [products, setProducts] = React.useState([]);
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
    console.log('entrou no fetch orders');
    await api.get('/sales', {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      const findOrder = response.data.filter((item) => id.includes(item.id))[0] ?? [];
      setOrders(findOrder);
      setStatusOrder(findOrder.status); // aqui não está retornando o que queria
      fetchSellers(findOrder?.sellerId);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const fetchProducts = React.useCallback(async () => {
    await api.get('/products', {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.error(error);
      setProducts(false);
    });
  }, []);

  const getProductById = (productId) => {
    const product = products?.find((el) => el.id === productId);
    return product;
  };

  React.useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const handleStatusBtn = React.useCallback(async (value) => {
    await api.put(`/sales/${id}`, {
      status: value,
    }, {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      setStatusOrder('Entregue');
      console.log('Response', response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  React.useEffect(() => {
    console.log('entrou no useeffect do statusorder');
    console.log(statusOrder);
  }, [statusOrder]);

  if (!orders && !sellers && !orderId) return null;
  const dateOrder = orders?.saleDate && new Date(orders?.saleDate);
  return (
    <>
      <Navbar
        user="customer"
      />
      <div id="od-header-section">
        <div id="id-and-seller-div">
          <div className="order-detail-info">
            Pedido:
            <span
              data-testid={ dataid.orderId }
            >
              {orders?.id}
            </span>
          </div>
          <div className="order-detail-info">
            <span
              data-testid={ dataid.sellerName }
            >
              {sellers?.name}
            </span>
          </div>
        </div>
        <div className="order-detail-info" id="order-detail-date">
          <span
            data-testid={ dataid.date }
          >
            {orders?.saleDate && format(dateOrder, 'dd/MM/yyyy')}
          </span>
        </div>
        <div className="order-detail-info">
          <span
            id="status-detail"
            data-testid={ dataid.status }
          >
            { statusOrder }
          </span>
        </div>
        <div className="order-detail-info">
          <button
            disabled={ statusOrder !== 'Em Trânsito' }
            type="button"
            id="delivered-button"
            value="Entregue"
            data-testid={ dataid.buttonDelivery }
            onClick={ (e) => handleStatusBtn(e.target.value) }
          >
            Marcar como entregue
          </button>
        </div>
      </div>
      <div className="containerTable">
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
          <tbody className="tableBody">
            {orderId?.map((item, index) => (
              <tr key={ item.id }>
                <td
                  className="productId"
                  data-testid={ `${dataid.itemId}-{index}` }
                >
                  { index + 1 }
                </td>
                <td
                  className="productName"
                  data-testid={ `${dataid.tableName}-{index}` }
                >
                  { getProductById(item.productId)?.name }
                </td>
                <td
                  className="productQuantity"
                  data-testid={ `${dataid.tableQuantity}-{index}` }
                >
                  {item.quantity}
                </td>
                <td
                  className="productPrice"
                  data-testid={ `${dataid.tableUnit}-{index}` }
                >
                  { removeComma(getProductById(item.productId)?.price) }
                </td>
                <td
                  className="productSubTotal"
                  data-testid={ `${dataid.tableTotal}-{index}` }
                >
                  { removeComma(
                    Number(getProductById(item.productId)?.price).toFixed(2)
                    * item.quantity,
                  ) }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="containerValue">
        <div className="colorValue">
          <span data-testid={ dataid.totalPrice }>
            Total: R$
            {' '}
            {removeComma(orders?.totalPrice)}
          </span>
        </div>
      </div>
    </>
  );
}
export default OrderDetail;
