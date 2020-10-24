import React, { useContext } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, queryCache } from 'react-query';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher, isEmptyObj } from '../../utils';
import AuthContext from '../../components/Contexts/AuthContext';
import PageLayout from '../../components/Layout/PageLayout';
import Button from 'react-bootstrap/Button';
import { getAllUserLikes } from '../../actions/auth';

const Item = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const { user, addToCart, likeItem, deleteLikeItem } = useContext(AuthContext);

  const { data: item, error } = useSWR(
    `http://localhost:8081/items/${itemId}`,
    fetcher
  );

  // const { data: userLike, error: userLikeError } = useSWR(
  //   `http://localhost:8081/items/likes/${itemId}/users/${user.id}`,
  //   fetcher
  // );
  const { data: userLike, isSuccess } = useQuery(
    ['userLike', itemId, user.id],
    getAllUserLikes
  );

  const [mutate, { isLoading }] = useMutation(getAllUserLikes, {
    onSuccess: () => {
      queryCache.invalidateQueries('userLike');
      // console.log(newRes);
      // queryCache.setQueryData('userLike', () => {
      //   return newRes;
      // });
    },
  });

  if (error) return 'An error has occurred.';
  if (!item) return '';

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
          onClick={() => {
            if (userLike && userLike.data.length > 0) {
              deleteLikeItem(user.id, item.data[0].id);
            } else {
              likeItem(user.id, item.data[0].id);
            }
            mutate(item.data[0].id, user.id);
          }}
          disabled={isEmptyObj(user)}>
          {userLike && userLike.data.length > 0 ? 'Unlike' : 'Like'}
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
