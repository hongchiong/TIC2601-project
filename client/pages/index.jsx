import React, { useContext } from 'react';
import Link from 'next/link';

import AuthContext from '../components/Contexts/AuthContext';
import useSWR from 'swr';
import { fetcher } from '../utils';
import PageLayout from '../components/Layout/PageLayout';
import { Button } from 'react-bootstrap';

const Index = () => {
  const { data: items, error } = useSWR('http://localhost:8081/items', fetcher);

  if (error) return 'An error has occurred.';
  if (!items) return '';

  const { addToCart } = useContext(AuthContext);

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <h1>All Products</h1>
      <div className='items-container'>
        {items.data.map((item) => (
          <div className='items-card'>
            <Link href={`/items/${item.id}`} passHref>
              <a href={`/items/${item.id}`}>
                <h5>{item.itemName}</h5>
              </a>
            </Link>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>
              Posted by:{' '}
              <Link href={`/users/${item.user_id}`} passHref>
                <a href={`/users/${item.user_id}`}>{item.userName}</a>
              </Link>
            </p>

            <Button
              variant='primary'
              onClick={() => {
                addToCart(item);
              }}>
              Add to cart
            </Button>
          </div>
        ))}
      </div>

      <style jsx>
        {`
          h5 {
            font-weight: bold;
          }

          .items-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .items-card {
            border: 1px solid gray;
            border-radius: 12px;
            margin: 12px;
            padding: 12px;
            width: 22%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          a {
            text-decoration: none;
          }
        `}
      </style>
    </PageLayout>
  );
};

export default Index;
