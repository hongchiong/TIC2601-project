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
  return (
    <div className='likes-root'>
      <div className='likes-container'>
        {isSuccess &&
          userLikedItems.data.map((item, i) => (
            <Link href={`/items/${item.item_id}`} passHref>
              <a href={`/items/${item.item_id}`}>
                {i + 1}. {item.name} @ ${item.price}
              </a>
            </Link>
          ))}
      </div>

      <style jsx>{`
        .likes-root {
          padding: 2% 0;
        }

        a {
          display: block;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default Likes;
