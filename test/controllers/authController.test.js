/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import supertest from 'supertest';
import app from '../..';

import { user2 } from './testData/userData';

const request = supertest(app);

let userDetail = {};

beforeEach(() => {
  userDetail = { ...user2 };
});

describe('user can login', () => {
  it('should log user in with email', async () => {
    const response = await request.post('/api/v1/auth/login').send(userDetail);
    const {
      status,
      data: { statusCode, message, payload },
    } = response.body;
    expect(status).toEqual('success');
    expect(statusCode).toBe(202);
    expect(message).toEqual('You have successfully logged in');
    expect(payload).toBeDefined();
  });

  it('should reject user with bad user details', async () => {
    const response = await request.post('/api/v1/auth/login').send({});
    const {
      status,
      data: { statusCode, message, payload },
    } = response.body;
    expect(status).toEqual('failure');
    expect(statusCode).toBe(406);
    expect(message).toEqual('Your email format is not acceptable');
    expect(payload).toBeFalsy();
  });

  it('should reject user with bad user details', async () => {
    userDetail.email = 'ebzeal@yahoocom';
    const response = await request.post('/api/v1/auth/login').send(userDetail);
    const {
      status,
      data: { statusCode, message, payload },
    } = response.body;
    expect(status).toEqual('failure');
    expect(statusCode).toBe(406);
    expect(message).toEqual('Your email format is not acceptable');
    expect(payload).toBeFalsy();
  });

  it('should reject user with wrong password', async () => {
    userDetail.password = 'ebzeal12345';
    const response = await request.post('/api/v1/auth/login').send(userDetail);
    const {
      status,
      data: { statusCode, message, payload },
    } = response.body;
    expect(status).toEqual('failure');
    expect(statusCode).toBe(401);
    expect(message).toEqual('Your login information is not correct');
    expect(payload).toBeFalsy();
  });

  it('should fail if user is not found', async () => {
    userDetail.email = 'ebzeal1@yahoo.com';
    userDetail.password = 'ebzeal12345';
    const response = await request.post('/api/v1/auth/login').send(userDetail);
    const {
      status,
      data: { statusCode, message, payload },
    } = response.body;
    expect(status).toEqual('failure');
    expect(statusCode).toBe(404);
    expect(message).toEqual('Your login information is not correct');
    expect(payload).toBeFalsy();
  });
});
