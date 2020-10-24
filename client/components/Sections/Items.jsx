import React from 'react';
import Link from 'next/link';

import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import { getUserItems } from '../../actions/auth';

const Items = ({ userData, me }) => {
  const { data: userItems, isSuccess } = useQuery(
    ['userItems', userData.data[0].id],
    getUserItems,
    {
      enabled: userData,
    }
  );

  return (
    <div className='items-root'>
      <div className='items-container'>
        {isSuccess &&
          userItems.data.map((item) => (
            <div className='items-card'>
              <Link href={`/items/${item.id}`} passHref>
                <a href={`/items/${item.id}`}>
                  <h5>{item.name}</h5>
                </a>
              </Link>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>
                Posted by:{' '}
                <Link href={`/users/${item.user_id}`} passHref>
                  <a href={`/users/${item.user_id}`}>{userData.data[0].name}</a>
                </Link>
              </p>

              {me ? (
                <Button variant='primary'>Edit</Button>
              ) : (
                <Button
                  variant='primary'
                  onClick={() => {
                    addToCart(item);
                  }}>
                  Add to cart
                </Button>
              )}
            </div>
          ))}
      </div>
      <style jsx>{`
        .items-root {
          padding: 2% 0;
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
      `}</style>
    </div>
  );
};

export default Items;
