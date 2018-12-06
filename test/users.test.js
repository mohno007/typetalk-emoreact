import { User } from '../src/users.js';
import Assert from 'assert';

describe('User', function() {
  it('should have name', function() {
    const user = new User('name');

    Assert.equal(user.name, 'name');
  });
});
