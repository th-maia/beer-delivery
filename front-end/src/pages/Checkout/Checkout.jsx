import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useLocalStorage from '../../hooks/useLocalStorage';
import useCart from '../../hooks/useCart';
import removeComma from '../../utils/removeComma';

function Checkout() {
  const [value] = useLocalStorage('cart', '');
  const { getCart, getCartTotal, removeProductCart } = useCart();

  const title = [
    { id: 1, title: 'Item', align: 'center', width: '50px' },
    { id: 2, title: 'Descrição', align: 'center', width: '250px' },
    { id: 3, title: 'Quantidade', align: 'center', width: '80px' },
    { id: 4, title: 'Valor Unitário', align: 'center', width: '150px' },
    { id: 5, title: 'Sub-total', align: 'center', width: '80px' },
    { id: 6, title: 'Remover item', align: 'center', width: '200px' },
  ];

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
                    { removeComma(parseFloat(product.price).toFixed(2))}
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
          <div style={ { marginTop: 50 } }>
            <div>
              <select name="seller" data-testid="customer_checkout__select-seller">
                <option>Zé Birita</option>
              </select>
            </div>
            <div>
              <input
                name="address"
                placeholder="Endereço"
                type="text"
                data-testid="customer_checkout__input-address"
              />
            </div>
            <div>
              <input
                name="number"
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
              <button type="button" data-testid="customer_checkout__button-submit-order">
                Finalizar pedido
              </button>
            </div>
          </div>
        </>

      )
        : 'Carrinho vazio'}
    </>
  );
}

export default Checkout;
