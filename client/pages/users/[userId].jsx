import React, { useContext } from 'react';
// import Link from 'next/link';

import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../utils';
import AuthContext from '../../components/Contexts/AuthContext';
import PageLayout from '../../components/Layout/PageLayout';
// import Button from 'react-bootstrap/Button';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { user } = useContext(AuthContext);

  console.log(user.id === userId);

  const { data: item, error } = useSWR(
    `http://localhost:8081/users/${userId}`,
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!item) return '';

  console.log(item);
  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <h1>User: {userId}</h1>
      <style jsx>{`
        h1 {
        }
      `}</style>
    </PageLayout>
  );
};

export default User;
