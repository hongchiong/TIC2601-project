import React from 'react';
import Link from 'next/link';

import { useQuery } from 'react-query';
import { getUserLikedItems } from '../../actions/auth';

const Likes = ({ userData, me }) => {
  console.log(userData);

  const { data: userLikedItems, isSuccess } = useQuery(
    ['userLikedItems', userData.data[0].id],
    getUserLikedItems,
    {
      enabled: userData,
    }
  );

  console.log(userLikedItems);

  return (
    <div className='likes-root'>
      {isSuccess &&
        userLikedItems.data.map((item, i) => (
          <Link href={`/items/${item.item_id}`} passHref>
            <a href={`/items/${item.item_id}`}>
              {i + 1}. {item.name} @ ${item.price}
            </a>
          </Link>
        ))}
      <style jsx>{`
        .likes-root {
          padding: 2% 0;
        }
      `}</style>
    </div>
  );
};

export default Likes;
