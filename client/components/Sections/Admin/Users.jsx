import React from 'react';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';

import { useQuery } from 'react-query';
import Button from 'react-bootstrap/Button';
import { getAllUsers, DeleteUser } from '../../../actions/auth';

const Users = () => {
  const { data: allUsers, isSuccess } = useQuery(['allUsers'], getAllUsers);

  console.log(allUsers);
  return (
    <div className='users-root'>
      <div className='users-container'>
        {isSuccess &&
          allUsers.data.map((user) => (
            <ListGroup.Item>
              <div className='users-card'>
                <Link href={`/users/${user.id}`} passHref>
                  <a href={`/users/${user.id}`}>
                    <h5>{user.name}</h5>
                  </a>
                </Link>
                <p>{user.email}</p>
                <p>{user.address}</p>
                <div className='button-group'>
                  {/* <Button variant='warning'>Edit</Button> */}
                  <Button
                    variant='danger'
                    onClick={() => {
                      DeleteUser(user.id);
                    }}>
                    Delete
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
      </div>
      <style jsx>{`
        .users-root {
          padding: 2% 0;
        }
        .users-container {
          min-height: 70vh;
          border: 1px solid #dddddd;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .users-card {
          display: flex;
          justify-content: space-between;
        }

        .button-group {
          width: 13%;
        }

        .users-card > p {
          width: 30%;
        }

        a {
          text-decoration: none;
          width: 27%;
        }
      `}</style>
    </div>
  );
};

export default Users;
