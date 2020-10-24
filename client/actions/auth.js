import axios from 'axios';
import { queryCache } from 'react-query';

import {
  handleAPIResponse,
  to
} from '../utils';

export const UserLogin = async (data) => {
  const url = 'http://localhost:8081/login';
  const [err, res] = await to(
    axios.request({
      url,
      method: 'post',
      data: {
        email: data.email,
        password: data.password,
      },
    })
  );

  console.log(err, res);
  // return handleAPIResponse(err, res);
  return [err, res];
};

export const UserSignup = async (data) => {
  const url = 'http://localhost:8081/signup';
  const [err, res] = await to(
    axios.request({
      url,
      method: 'post',
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
      },
    })
  );

  console.log(err, res);
  // return handleAPIResponse(err, res);
  return [err, res];
};


export const LikeItem = async (userId, itemId) => {
  const url = 'http://localhost:8081/likes';
  const [err, res] = await to(
    axios.request({
      url,
      method: 'post',
      data: {
        user_id: userId,
        item_id: itemId,
      },
    })
  );

  console.log(err, res);
  // return handleAPIResponse(err, res);
  return [err, res];
};

export const DeleteLikeItem = async (userId, itemId) => {
  const url = 'http://localhost:8081/likes';
  const [err, res] = await to(
    axios.request({
      url,
      method: 'delete',
      data: {
        user_id: userId,
        item_id: itemId,
      },
    })
  );

  console.log(err, res);
  // return handleAPIResponse(err, res);
  return [err, res];
};


export const getAllUserLikes = async (key, itemId, userId) => {
  const url = `http://localhost:8081/items/likes/${itemId}/users/${userId}`;

  const [err, res] = await to(
    axios.request({
      url,
      method: 'get',
    }),
  );

  if (err) {
    return err.data;
  }
  return res.data;
};


export const getUser = async (key, userId) => {
  const url = `http://localhost:8081/users/${userId}`;

  const [err, res] = await to(
    axios.request({
      url,
      method: 'get',
    }),
  );

  if (err) {
    return err.data;
  }
  return res.data;
};

export const getUserItems = async (key, userId) => {
  const url = `http://localhost:8081/items/me/${userId}`;

  const [err, res] = await to(
    axios.request({
      url,
      method: 'get',
    }),
  );

  if (err) {
    return err.data;
  }
  return res.data;
};

export const getUserComments = async (key, userId) => {
  const url = `http://localhost:8081/comments/users/${userId}`;

  const [err, res] = await to(
    axios.request({
      url,
      method: 'get',
    }),
  );

  if (err) {
    return err.data;
  }
  queryCache.invalidateQueries('userComments');
  return res.data;
};

export const postComment = async (sender_id, receiver_id, comment) => {
  const url = 'http://localhost:8081/comment';
  const [err, res] = await to(
    axios.request({
      url,
      method: 'post',
      data: {
        sender_id,
        receiver_id,
        comment
      },
    })
  );
  console.log(err, res);
  return [err, res];
};

//Get all likes by user
export const getUserLikedItems = async (key, userId) => {
  const url = `http://localhost:8081/likes/me/${userId}`;

  const [err, res] = await to(
    axios.request({
      url,
      method: 'get',
    }),
  );

  if (err) {
    return err.data;
  }
  return res.data;
};

export const createOrder = async (user_id, items) => {
  const url = 'http://localhost:8081/orders';
  const [err, res] = await to(
    axios.request({
      url,
      method: 'post',
      data: {
        user_id,
        items,
      },
    })
  );

  console.log(err, res);
  return [err, res];
};

export const getAllOrdersItems = async (key, userId) => {
  const url = `http://localhost:8081/orders/me/${userId}`;

  const [err, res] = await to(
    axios.request({
      url,
      method: 'get',
    }),
  );

  if (err) {
    return err.data;
  }
  return res.data;
};