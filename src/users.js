/**
 * ユーザ
 */
export class User {
  constructor(name) {
    Object.assign(this, { name });
  }

  equals(other) {
    return this.name === other.name;
  }
}

/**
 * ユーザの集合
 */
export class Users {
  static of(...users) {
    return new this(users);
  }
  /**
   * @param {Array<User>}
   */
  constructor(users) {
    Object.assign(this, { users });
  }

  length() {
    return this.users.length;
  }

  append(user) {
    return new User([...this.users, user]);
  }

  merge(other) {
    return new User([...this.users, ...other.users]);
  }

  includes(user) {
    return !!this.users.find(u => u.equals(user));
  }

  notIncludes(user) {
    return !this.includes(user);
  }

  [Symbol.iterator]() {
    let self = this;
    return (function*() {
      for (const user of self.users) {
        yield user;
      }
    })();
  }
}
