import React from 'react';
// import Link from 'next/link';

import { useQuery } from 'react-query';
import { getAllOrdersItems } from '../../actions/auth';

const Orders = ({ userData, me }) => {
  console.log(userData);

  const { data: userOrdersItems, isSuccess } = useQuery(
    ['userOrdersItems', userData.data[0].id],
    getAllOrdersItems,
    {
      enabled: userData,
    }
  );

  console.log(userOrdersItems);

  return (
    <div className='orders-root'>
      <div className='orders-container'>
        {isSuccess &&
          userOrdersItems.orderIds.map((id) => (
            <div className='order-container'>
              <p>Order ID: {id.id}</p>
              <div>
                Items:
                {userOrdersItems.data.map((item) => {
                  if (item.order_id === id.id)
                    return (
                      <div className='item'>
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{item.quantity}</p>
                      </div>
                    );
                })}
              </div>
            </div>
          ))}
      </div>

      <style jsx>{`
        .orders-root {
          padding: 2% 0;
        }

        .order-container {
          padding: 12px;
          border: 1px solid gray;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .item {
          display: flex;
        }

        .item > p {
          margin-right: 12px;
        }

        a {
          display: block;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};

export default Orders;
