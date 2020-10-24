import React, { useContext } from 'react';
import PageLayout from '../components/Layout/PageLayout';
import ProductListView from '../components/Products/ProductListView';
import AuthContext from '../components/Contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import { isEmptyObj } from '../utils/index';

const Checkout = () => {
  const { user, cart, emptyCart } = useContext(AuthContext);

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      {cart.map((item) => (
        <ProductListView item={item} />
      ))}
      <div className='cart-details'>
        <p>
          Total Cost: $
          {cart
            ? cart.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price,
                0
              )
            : 0}
        </p>

        <Button variant='primary' onClick={() => emptyCart()}>
          Empty Cart
        </Button>
        <Button
          variant='primary'
          onClick={() => alert('checkout endpoint')}
          disabled={isEmptyObj(user)}>
          Checkout
        </Button>
      </div>
      <style jsx>{`
        h1 {
        }

        .cart-details {
          display: flex;
          justify-content: space-between;
          margin: 24px 0;
        }
      `}</style>
    </PageLayout>
  );
};

export default Checkout;
