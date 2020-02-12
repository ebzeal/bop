/* eslint-disable no-undef */
import supertest from 'supertest';

import app from '../index';

const request = supertest(app);

describe('GET / should display welcome message', () => {
  it('welcomes the user', async () => {
    const response = await request.get('/api/v1/');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('Welcome to Ben Oketola Publications');
  });
});
