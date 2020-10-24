import axios from 'axios';
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