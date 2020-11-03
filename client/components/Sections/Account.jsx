import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import Button from 'react-bootstrap/Button';

const Account = ({ userData, me }) => {
  const { setShowModal } = useContext(AuthContext);

  return (
    <div className='account-root'>
      <h4>Name: {userData.data[0].name}</h4>
      <p>Email: {userData.data[0].email}</p>
      <p>Address: {userData.data[0].address}</p>
      {me && (
        <Button variant='primary' onClick={() => setShowModal('editUser')}>
          Edit
        </Button>
      )}
      <style jsx>{`
        .account-root {
          padding: 2% 0;
        }
      `}</style>
    </div>
  );
};

export default Account;
