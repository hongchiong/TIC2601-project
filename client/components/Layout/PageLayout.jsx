import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import AuthContext from '../Contexts/AuthContext';
import { isEmptyObj } from '../../utils';
import { Navbar, Nav, Container, Button, Modal, Form } from 'react-bootstrap';
import { CreateItem, EditItem, EditUser } from '../../actions/auth';

const PageLayout = ({ title, children }) => {
  const {
    login,
    signup,
    cart,
    user,
    logout,
    showModal,
    setShowModal,
  } = useContext(AuthContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
  });

  const [itemForm, setItemForm] = useState({
    user_id: user.id,
    name: '',
    price: 0,
    quantity: 0,
  });

  console.log(showModal);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container>
        <Navbar bg='light' expand='lg'>
          <Link href='/' passHref>
            <Navbar.Brand href='/'>TIC2601 Ecommerce</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              {/* <Link href='/' passHref>
                <Nav.Link href='/'>Home</Nav.Link>
              </Link> */}
            </Nav>

            <div className='buttons-container'>
              {isEmptyObj(user) ? (
                <>
                  <Button
                    variant='outline-primary'
                    onClick={() => setShowLogin(true)}>
                    Login
                  </Button>

                  <Button
                    variant='outline-primary'
                    onClick={() => setShowSignup(true)}>
                    Signup
                  </Button>
                </>
              ) : (
                <Button variant='outline-primary' onClick={() => logout()}>
                  Logout
                </Button>
              )}
            </div>
            {!isEmptyObj(user) && user.admin !== 1 && (
              <Link href={`/users/${user.id}`} passHref>
                <a href={`/users/${user.id}`}>My Dashboard</a>
              </Link>
            )}

            {!isEmptyObj(user) && user.admin === 1 && (
              <Link href={`/admin`} passHref>
                <a href={`/admin`}>Admin Dashboard</a>
              </Link>
            )}

            <Link href='/checkout' passHref>
              <a href='/checkout'>
                Cart:{' '}
                {cart
                  ? cart.reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.quantity,
                      0
                    )
                  : 0}
              </a>
            </Link>
          </Navbar.Collapse>
        </Navbar>
        {children}
      </Container>

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              login(form);
              setForm({ email: '', password: '', name: '', address: '' });
            }}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showSignup} onHide={() => setShowSignup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signup(form);
              setForm({ email: '', password: '', name: '', address: '' });
            }}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Name'
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Address'
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Signup
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModal === 'editUser'} onHide={() => setShowModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              EditUser(form);
              setForm({ email: '', password: '', name: '', address: '' });
            }}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value, user_id: user.id })
                }
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                    user_id: user.id,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Name'
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value, user_id: user.id })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Address'
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                    user_id: user.id,
                  })
                }
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Edit Account Details
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showModal === 'postItem'} onHide={() => setShowModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Post Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              CreateItem(itemForm);
              setItemForm({
                user_id: user.id,
                name: '',
                price: 0,
                quantity: 0,
              });
            }}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter item name'
                value={itemForm.name}
                onChange={(e) =>
                  setItemForm({
                    ...itemForm,
                    name: e.target.value,
                    user_id: user.id,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='price'
                value={itemForm.price}
                onChange={(e) =>
                  setItemForm({
                    ...itemForm,
                    price: e.target.value,
                    user_id: user.id,
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type='number'
                placeholder='quantity'
                value={itemForm.quantity}
                onChange={(e) =>
                  setItemForm({
                    ...itemForm,
                    quantity: e.target.value,
                    user_id: user.id,
                  })
                }
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Post Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModal.slice(0, 8) === 'editItem'}
        onHide={() => setShowModal('')}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              EditItem(itemForm);
              setItemForm({
                user_id: user.id,
                name: '',
                price: 0,
                quantity: 0,
              });
            }}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter item name'
                value={itemForm.name}
                onChange={(e) =>
                  setItemForm({
                    ...itemForm,
                    name: e.target.value,
                    user_id: user.id,
                    item_id: showModal.slice(8),
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='price'
                value={itemForm.price}
                onChange={(e) =>
                  setItemForm({
                    ...itemForm,
                    price: e.target.value,
                    user_id: user.id,
                    item_id: showModal.slice(8),
                  })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type='number'
                placeholder='quantity'
                value={itemForm.quantity}
                onChange={(e) =>
                  setItemForm({
                    ...itemForm,
                    quantity: e.target.value,
                    user_id: user.id,
                    item_id: showModal.slice(8),
                  })
                }
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Edit Item
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <style jsx>
        {`
          .page-layout-root {
          }

          .buttons-container {
            width: 20%;
            display: flex;
            justify-content: space-around;
          }

          a {
            margin-left: 12px;
          }
        `}
      </style>
    </>
  );
};

export default PageLayout;
