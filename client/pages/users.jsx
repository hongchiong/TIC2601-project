import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../utils';
import PageLayout from '../components/Layout/PageLayout';
import { Card, ListGroup } from 'react-bootstrap';

const Users = () => {
  const { data: users, error } = useSWR('http://localhost:8081/users', fetcher);

  if (error) return 'An error has occurred.';
  if (!users) return 'Loading...';
  return (
    <PageLayout title='List all Users'>
      <Card style={{ width: '18rem' }}>
        <ListGroup variant='flush'>
          {users.data.map((user) => (
            <ListGroup.Item>
              <h6>Name: {user.name}</h6>
              <p>Email: {user.email}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <style jsx>
        {`
          .root {
          }
          }
        `}
      </style>
    </PageLayout>
  );
};

export default Users;
