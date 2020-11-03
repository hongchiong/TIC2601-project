import React, { useState, useContext, useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useRouter } from 'next/router';
import AuthContext from '../components/Contexts/AuthContext';
import PageLayout from '../components/Layout/PageLayout';
import Users from '../components/Sections/Admin/Users';
import Items from '../components/Sections/Admin/Items';

const Admin = () => {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const [key, setKey] = useState('Users');

  useEffect(() => {
    if (!user || !user.admin) router.push('/');
  }, [user]);

  return (
    <PageLayout title='TIC2601 Ecommerce'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}>
        <Tab eventKey='Users' title='Users'></Tab>
        <Tab eventKey='Items' title='Items'></Tab>
        {/* <Tab eventKey='Analytics' title='Analytics'></Tab> */}
      </Tabs>
      {
        {
          Users: <Users />,
          Items: <Items />,
          // Analytics: <Analytics />,
        }[key]
      }
      <style jsx>{`
        h1 {
        }
      `}</style>
    </PageLayout>
  );
};

export default Admin;
