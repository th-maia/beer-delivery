import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import useLocalStorage from '../../hooks/useLocalStorage';
import useCart from '../../hooks/useCart';
import removeComma from '../../utils/removeComma';
import getDateNow from '../../utils/formatDate';
import api from '../../services/api';

function Checkout() {
  // const objectExample = {
  //   sellerId: '',
  //   totalPrice: '',
  //   deliveryAddress: '',
  //   deliveryNumber: '',
  //   saleDate: '',
  //   status: '',
  //   products: '',
  // };

  const [value] = useLocalStorage('cart', '');
  const user = JSON.parse(localStorage.getItem('user'));
  const { getCart, getCartTotal, removeProductCart } = useCart();
  const navigate = useNavigate();

  const title = [
    { id: 1, title: 'Item', align: 'center', width: '50px' },
    { id: 2, title: 'Descrição', align: 'center', width: '250px' },
    { id: 3, title: 'Quantidade', align: 'center', width: '80px' },
    { id: 4, title: 'Valor Unitário', align: 'center', width: '150px' },
    { id: 5, title: 'Sub-total', align: 'center', width: '80px' },
    { id: 6, title: 'Remover item', align: 'center', width: '200px' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.elements;
    const saleObject = {
      sellerId: form.sellerId.value,
      deliveryAddress: form.deliveryAddress.value,
      deliveryNumber: form.deliveryNumber.value,
      saleDate: getDateNow(),
      status: 'Pendente',
      products: getCart().map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
      })),
      totalPrice: getCartTotal(),
    };

    api.post('/sales', saleObject, {
      headers: {
        authorization: user?.token,
      },
    }).then((response) => {
      navigate(`/customer/orders/${response.data.id}`);
    }).catch((error) => {
      console.error(error.response.data);
    });
  };

  return (
    <>
      <Navbar />
      <h1>Finalizar pedido</h1>
      {value ? (
        <>
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
          </table>
          <tbody>
            {getCart()
              && getCart()?.map((product, index) => (
                <tr key={ product.id }>
                  <td
                    width="50px"
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    width="250px"
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {product.name}
                  </td>
                  <td
                    width="80px"
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {product.quantity}
                  </td>
                  <td
                    width="150px"
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {removeComma(parseFloat(product.price).toFixed(2))}
                  </td>
                  <td
                    width="80px"
                    align="center"
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {removeComma(parseFloat(product.price * product.quantity).toFixed(2))}
                  </td>
                  <td
                    width="200px"
                    align="center"
                    style={ {
                      textAlign: 'center',
                    } }
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                  >
                    <button
                      type="button"
                      onClick={ () => removeProductCart(product.id) }
                    >
                      Remover item
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <form style={ { marginTop: 50 } } onSubmit={ handleSubmit }>
            <div>
              <select name="sellerId" data-testid="customer_checkout__select-seller">
                <option value={ user?.id }>{ user?.name }</option>
              </select>
            </div>
            <div>
              <input
                name="deliveryAddress"
                placeholder="Endereço"
                type="text"
                data-testid="customer_checkout__input-address"
              />
            </div>
            <div>
              <input
                name="deliveryNumber"
                placeholder="Número"
                type="text"
                data-testid="customer_checkout__input-address-number"
              />
            </div>
            <span data-testid="customer_checkout__element-order-total-price">
              {getCartTotal()
                ? removeComma(parseFloat(getCartTotal()).toFixed(2))
                : '00,00'}
            </span>
            <div>
              <button type="submit" data-testid="customer_checkout__button-submit-order">
                Finalizar pedido
              </button>
            </div>
          </form>
        </>

      )
        : 'Carrinho vazio'}
    </>
  );
}

export default Checkout;
