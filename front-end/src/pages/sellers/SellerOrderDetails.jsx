import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { getOrderById } from '../../services/apiCalls';
import socket from '../../utils/socketClient';

export default function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const apiCall = async () => {
      const response = await getOrderById(params.id);
      if (response.error) {
        console.log(response.error);
      } else {
        setOrder(response);
        setProducts(response.products);
      }
    };
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('updatedStatus', ({ status }) => {
      setOrder({ ...order, status });
    });
  }, [order]);

  const changeStatus = ({ target: { value: newStatus } }) => {
    const { id: userId } = JSON.parse(localStorage.getItem('user'));
    socket.emit('changeStatus', ({ userId, orderId: order.id, status: newStatus }));
  };

  const datId = 'seller_order_details__element-order';
  return (
    <div>
      <Navbar />
      <h2>
        Detalhe do pedido
      </h2>
      <div>
        <p
          data-testid={ `${datId}-details-label-order-id` }
        >
          {order.id}
        </p>
        <p
          data-testid={ `${datId}-details-label-order-date` }
        >
          {order.saleDate}
        </p>
        <p
          data-testid={ `${datId}-details-label-delivery-status` }
        >
          {order.status}
        </p>
        <button
          type="button"
          value="Preparando"
          disabled={ order.status !== 'Pendente' }
          onClick={ (e) => changeStatus(e) }
          data-testid="seller_order_details__button-preparing-check"
        >
          Preparar pedido
        </button>
        <button
          type="button"
          value="Em Trânsito"
          disabled={ order.status !== 'Preparando' }
          onClick={ (e) => changeStatus(e) }
          data-testid="seller_order_details__button-dispatch-check"
        >
          Saiu para entrega
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>valor Unitarío</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${datId}-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `${datId}-table-name-${index}` }
                >
                  {product.name}
                </td>
                <td
                  data-testid={ `${datId}-table-quantity-${index}` }
                >
                  {product.salesProducts.quantity}
                </td>
                <td
                  data-testid={ `${datId}-table-unit-price-${index}` }
                >
                  {product.price.replace('.', ',')}
                </td>
                <td
                  data-testid={ `${datId}-table-sub-total-${index}` }
                >
                  {(Number(product.price) * (product.salesProducts.quantity)).toFixed(2) }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p data-testid={ `${datId}-total-price` }>
        {
          `Total: ${Number(order.totalPrice)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        }
      </p>
    </div>
  );
}
