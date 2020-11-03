import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, queryCache } from 'react-query';

import AuthContext from '../components/Contexts/AuthContext';
import PageLayout from '../components/Layout/PageLayout';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { getAllItems } from '../actions/auth';

const Index = () => {
  const { data: items, isSuccess } = useQuery(['allItems'], getAllItems);

  const [mutate, { isLoading }] = useMutation(getAllItems, {
    onSuccess: (newRes) => {
      queryCache.setQueryData('allItems', newRes);
    },
  });

  const { addToCart } = useContext(AuthContext);
  const [filterText, setFilterText] = useState('');

  const filterItems = () => {
    const data = items.data.filter((a) =>
      a.itemName.toLowerCase().includes(filterText.toLowerCase())
    );
    return { data };
  };

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <div className='control-bar'>
        <h1>All Products</h1>

        <div className='filter-group'>
          <input
            type='text'
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder='Filter by text'
          />
        </div>

        <DropdownButton id='dropdown-item-button' title='Sort by:'>
          <Dropdown.Item
            as='button'
            onClick={() => {
              mutate('alp');
            }}>
            Alphabetical
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            onClick={() => {
              mutate('asc');
            }}>
            Price ASC
          </Dropdown.Item>
          <Dropdown.Item
            as='button'
            onClick={() => {
              mutate('des');
            }}>
            Price DESC
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <div className='items-container'>
        {isSuccess &&
          !isLoading &&
          (filterText ? filterItems() : items).data.map((item) => (
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
          h1 {
            margin-right: 20px;
          }
          .control-bar {
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          h5 {
            font-weight: bold;
          }

          .filter-group {
            width: 32%;
          }

          .filter-group > input {
            padding: 0 8px;
            width: 100%;
          }

          .items-container {
            display: flex;
            flex-wrap: wrap;
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
