import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import socket from '../../utils/socketClient';
import getSaleById from '../../services/ApiSalesService';

export default function OrderDetails() {
  const [order, setOrder] = useState([]);
  const [sellerName, setSellerName] = useState([]);
  const [products, setProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    const get = async () => {
      const { id } = params;
      const response = await getSaleById(id);
      setOrder(response);
      setSellerName(response.seller.name);
      setProducts(response.products);
    };
    get();
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

  const datId = 'customer_order_details__element-order';
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
          data-testid={ `${datId}-details-label-seller-name` }
        >
          {sellerName}
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
          data-testid="customer_order_details__button-delivery-check"
          value="Entregue"
          onClick={ (e) => changeStatus(e) }
          disabled={ order.status !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>
      </div>
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
                data-testid={
                  `${datId}-table-quantity-${index}`
                }
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
                {(Number(product.price) * (product.salesProducts.quantity))
                  .toFixed(2) }
              </td>
            </tr>
          ))
        }
      </tbody>
      <p data-testid="customer_order_details__element-order-total-price">
        {
          `Total: ${Number(order.totalPrice)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
        }
      </p>
    </div>
  );
}
