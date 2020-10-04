import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils';
import PageLayout from '../components/Layout/PageLayout';
import { Button } from 'react-bootstrap';

const Index = () => {
  const { data: items, error } = useSWR('http://localhost:8081/items', fetcher);

  if (error) return 'An error has occurred.';
  if (!items) return 'Loading...';

  console.log(items);

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <h1>All Products</h1>
      <div className='items-container'>
        {items.data.map((item) => (
          <div className='items-card'>
            <h5>{item.itemName}</h5>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Posted by: {item.userName}</p>
            <Button
              variant='primary'
              onClick={() => alert(`Adding ${item.itemName} to cart`)}>
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
        `}
      </style>
    </PageLayout>
  );
};

export default Index;
