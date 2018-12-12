import { Like } from '../src/like.js';
import { User } from '../src/users.js';
import { Reactions } from '../src/reactions.js';
import Assert from 'assert';

describe('Reactions', function() {
  it('should be created from Like which has comment', function() {
    const user = new User('hoge');
    const like = Like.withComment(user, '😊😁😂');
    const reactions = Reactions.fromLike(like);

    Assert(reactions instanceof Reactions);
  });

  it('should be created from Like which has no comment', function() {
    const user = new User('hoge');
    const like = Like.noComment(user);
    const reactions = Reactions.fromLike(like);

    Assert(reactions instanceof Reactions);
  });

  it('should be iterable', function() {
    const user = new User('hoge');
    const like = Like.withComment(user, '😊😁😂');
    const reactions = Reactions.fromLike(like);

    Assert(reactions[Symbol.iterator] !== undefined);

    const iter = reactions[Symbol.iterator]();

    Assert(iter.next !== undefined);
  });

  describe('#merge', function() {
    const user1 = new User('hoge');
    const like1 = Like.withComment(user1, '😊😁😂');
    const reactions1 = Reactions.fromLike(like1);

    const user2 = new User('fuga');
    const like2 = Like.withComment(user2, '😊😁👺');
    const reactions2 = Reactions.fromLike(like2);

    const merged = reactions1.merge(reactions2);

    it('should return Reaction', function() {
      Assert(merged instanceof Reactions);
    });

    it('should have merged', function() {});
  });
});

/*
describe('Reaction', function() {
  it('should have `users`', function() {

    reaction
  });

  describe('')
});
*/
