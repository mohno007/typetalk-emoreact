import { User, Users } from '../src/users.js';
import Assert from 'assert';

describe('User', function () {
  it('should have `name`', function () {
    const user = new User('山田太郎');

    Assert(user.name == '山田太郎');
  });
});

describe('Users', function () {
  describe('#length', function () {
    it('はユーザ数を返す', function () {
      const users = new Users([new User('山田太郎'), new User('山田花子')]);

      Assert(users.length() == 2);
    });

    it('はユーザが誰も居ないなら 0を返す', function () {
      const users = new Users([]);

      Assert(users.length() == 0);
    });
  });
});
