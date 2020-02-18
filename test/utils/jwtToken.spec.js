/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
import tokenHelp from '../../utils/jwtToken';

import { user2 } from '../controllers/testData/userData';

jest.mock('../../utils/jwtToken');

const mockVerifyPassword = jest.fn(
  (password) => password === '$2y$10$BPU2wGd5SsWzyJbcK0UvjerCBdixz8B5isdFXHbM7U69KS7kgJnn6'
);

describe("user's password can be verified with hashed version", () => {
  it('should decrypt', async () => {
    mockVerifyPassword(user2.password);
  });
});
