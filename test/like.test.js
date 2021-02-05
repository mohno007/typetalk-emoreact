import { User } from '../src/users.js';
import { Like } from '../src/like.js';
import Assert from 'assert';

describe('Like', function () {
  describe('#noComment', function () {
    it('は、コメントがない場合は true を返す', function () {
      const like = Like.noComment(new User('user'));
      Assert(like.noComment() === true);
    });

    it('は、コメントがある場合は false を返す', function () {
      const like = Like.withComment(new User('user'), 'abc');
      Assert(like.noComment() === false);
    });
  });

  describe('#hasComment', function () {
    it('は、コメントがある場合は true を返す', function () {
      const like = Like.withComment(new User('user'), 'abc');
      Assert(like.hasComment() === true);
    });

    it('は、コメントがない場合は false を返す', function () {
      const like = Like.noComment(new User('user'));
      Assert(like.hasComment() === false);
    });
  });
});
