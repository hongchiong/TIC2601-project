import React, { useState, useContext } from 'react';
import { useQuery } from 'react-query';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useRouter } from 'next/router';
import AuthContext from '../../components/Contexts/AuthContext';
import PageLayout from '../../components/Layout/PageLayout';
import Account from '../../components/Sections/Account';
import Items from '../../components/Sections/Items';
import Comments from '../../components/Sections/Comments';
import Likes from '../../components/Sections/Likes';
import Orders from '../../components/Sections/Orders';
import { getUser } from '../../actions/auth';

const User = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { user } = useContext(AuthContext);

  const { data: userData, isSuccess } = useQuery(
    ['userData', userId],
    getUser,
    {
      enabled: userId,
    }
  );

  const [key, setKey] = useState('Account');
  const me = userId == user.id;

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}>
        <Tab eventKey='Account' title='Account'></Tab>
        <Tab eventKey='Items' title='Items'></Tab>
        <Tab eventKey='Comments' title='Comments'></Tab>
        {me && <Tab eventKey='Likes' title='Likes'></Tab>}
        {me && <Tab eventKey='Orders' title='Orders'></Tab>}
      </Tabs>
      {isSuccess &&
        {
          Account: <Account userData={userData} me={me} />,
          Items: <Items userData={userData} me={me} />,
          Comments: (
            <Comments userData={userData} me={me} loggedInUserId={user.id} />
          ),
          Likes: <Likes userData={userData} me={me} />,
          Orders: <Orders userData={userData} me={me} />,
        }[key]}
      <style jsx>{`
        h1 {
        }
      `}</style>
    </PageLayout>
  );
};

export default User;
