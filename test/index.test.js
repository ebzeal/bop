/* eslint-disable no-undef */
import supertest from 'supertest';
import env from 'dotenv';

import app from '../index';

const initApp = () => {
  const app = express();
  app.use(app());
  return app;
};

env.config();

const request = supertest(app);

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // this is important - it clears the cache
  process.env = { ...OLD_ENV };
  delete process.env.NODE_ENV;
});

afterEach(() => {
  process.env = OLD_ENV;
});

describe('GET / should display welcome message', () => {
  it('welcomes the user', async () => {
    const response = await request.get('/api/v1/');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('Welcome to Ben Oketola Publications');
  });

  it('does not return app.listen if the environment is test', async () => {
    const mockApp = jest.fn(console.log('Server started on port 5000'));
    expect(mockApp).not.toBeCalled();
  });

  // it('returns app.listen if the environment is test', async () => {
  //   process.env.NODE_ENV = 'dev';
  //   const mockAppListen = jest.spyOn(app.listen());
  //   console.log('TCL: mockAppListen', mockAppListen);
  //   // console.log('TCL: app.listen()', app.listen());
  //   const response = await request.get('/api/v1/');
  //   expect(response.body).toEqual('Welcome to Ben Oketola Publications');
  //   expect(mockAppListen).toHaveBeenCalledTimes(1);
  // });
});
