import { User, Users } from '../src/users.js';
import Assert from 'assert';

describe('User', function() {
  it('should have `name`', function() {
    const user = new User('山田太郎');

    Assert.equal(user.name, '山田太郎');
  });
});

describe('Users', function() {
  describe('#length', function() {
    it('should return correct length of users', function() {
      const users = new Users([new User('山田太郎'), new User('山田花子')]);

      Assert.equal(users.length(), 2);
    });

    it('should return 0 for empty users', function() {
      const users = new Users([]);

      Assert.equal(users.length(), 0);
    });
  });
});
