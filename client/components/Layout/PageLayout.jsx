import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import { Navbar, Nav, Container } from 'react-bootstrap';

const PageLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container>
        <Navbar bg='light' expand='lg'>
          <Link href='/' passHref>
            <Navbar.Brand href='/'>React-Bootstrap</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Link href='/' passHref>
                <Nav.Link href='/'>Home</Nav.Link>
              </Link>
              <Link href='/users' passHref>
                <Nav.Link href='/users'>Users</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {children}
      </Container>

      <style jsx>
        {`
          .page-layout-root {
          }
        `}
      </style>
    </>
  );
};

export default PageLayout;
