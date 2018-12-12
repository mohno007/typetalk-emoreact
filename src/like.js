import { User } from './users.js';

/**
 * あるメッセージに対するいいねの集合
 */
export class Like {
  static noComment(user) {
    return new this(user, undefined);
  }

  static withComment(user, comment) {
    return new this(user, comment);
  }

  constructor(user, comment) {
    if (!(user instanceof User))
      throw new Error('`user` は User でなければなりません。');

    Object.assign(this, { user, comment });
  }

  noComment() {
    return this.comment === undefined;
  }

  hasComment() {
    return !this.noComment();
  }
}
