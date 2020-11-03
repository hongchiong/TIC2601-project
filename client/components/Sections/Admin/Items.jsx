import React from 'react';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';

import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import { getAllItems, DeleteItem } from '../../../actions/auth';

const Items = () => {
  const { data: allItems, isSuccess } = useQuery(['allItems'], getAllItems);

  return (
    <div className='items-root'>
      <div className='items-container'>
        {isSuccess &&
          allItems.data.map((item) => (
            <ListGroup.Item>
              <div className='items-card'>
                <Link href={`/items/${item.id}`} passHref>
                  <a href={`/items/${item.id}`} className='itemName'>
                    <h5>{item.itemName}</h5>
                  </a>
                </Link>
                <Link href={`/users/${item.user_id}`} passHref>
                  <a href={`/users/${item.user_id}`} className='userName'>
                    <h5>Posted by: {item.userName}</h5>
                  </a>
                </Link>
                <p>${item.price}</p>
                <p>x {item.quantity}</p>

                <div className='button-group'>
                  {/* <Button variant='warning'>Edit</Button> */}
                  <Button
                    variant='danger'
                    onClick={() => {
                      DeleteItem(item.id);
                    }}>
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
      </div>
      <style jsx>{`
        .items-root {
          padding: 2% 0;
        }
        .items-container {
          min-height: 70vh;
          border: 1px solid #dddddd;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .items-card {
          display: flex;
          justify-content: space-between;
        }

        .button-group {
          width: 13%;
        }

        .items-card > p {
          width: 6%;
        }

        a {
          text-decoration: none;
        }

        .itemName {
          width: 20%;
        }

        .userName {
          width: 55%;
        }
      `}</style>
    </div>
  );
};

export default Items;
