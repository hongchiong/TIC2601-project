import React, { useContext } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher, isEmptyObj } from '../../utils';
import AuthContext from '../../components/Contexts/AuthContext';
import PageLayout from '../../components/Layout/PageLayout';
import Button from 'react-bootstrap/Button';

const Item = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const { user, addToCart } = useContext(AuthContext);

  const { data: item, error } = useSWR(
    `http://localhost:8081/items/${itemId}`,
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!item) return '';

  console.log(item);
  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <h1>{item.data[0] && item.data[0].itemName}</h1>
      <p className='posted-by'>
        posted by{' '}
        <Link href={`/users/${item.data[0] && item.data[0].user_id}`} passHref>
          <a
            href={`/users/${item.data[0] && item.data[0].user_id}`}
            className='items-card'>
            {item.data[0] && item.data[0].userName}
          </a>
        </Link>
      </p>
      <p className='description'>{item.data[0] && item.data[0].description}</p>
      <p className='price'>${item.data[0] && item.data[0].price}</p>
      <p className='quantity'>
        Remaining quantity: {item.data[0] && item.data[0].quantity}
      </p>

      <div className='btns-container'>
        <Button
          variant='primary'
          onClick={() => alert('like endpoint')}
          disabled={isEmptyObj(user)}>
          Like
        </Button>{' '}
        <Button variant='primary' onClick={() => addToCart(item.data[0])}>
          Add to cart
        </Button>
      </div>
      <style jsx>{`
        h1 {
        }
      `}</style>
    </PageLayout>
  );
};

export default Item;
