import React, { useContext } from 'react';
import PageLayout from '../components/Layout/PageLayout';
import ProductListView from '../components/Products/ProductListView';
import AuthContext from '../components/Contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import { isEmptyObj } from '../utils/index';
import { createOrder } from '../actions/auth';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { user, cart, emptyCart } = useContext(AuthContext);

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <div className='cart-root'>
        <div className='cart-items-list'>
          {cart.map((item) => (
            <ProductListView item={item} />
          ))}
        </div>

        <div className='cart-details'>
          <p>
            Total Cost: $
            {cart
              ? cart.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.price,
                  0
                )
              : 0}
          </p>

          <Button variant='primary' onClick={() => emptyCart()}>
            Empty Cart
          </Button>
          <Button
            variant='primary'
            onClick={async () => {
              const [err, res] = await createOrder(user.id, cart);
              if (err) {
                toast.warning('Order failed');
                return;
              }
              toast.success('Order successful!');
              emptyCart();
            }}
            disabled={isEmptyObj(user)}>
            Checkout
          </Button>
        </div>
      </div>

      <style jsx>{`
        .cart-root {
          padding: 2% 0;
        }

        .cart-items-list {
          height: 70vh;
          border: 1px solid #dddddd;
          border-radius: 12px;
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
