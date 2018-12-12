/**
 * ユーザ
 */
export class User {
  constructor(name) {
    Object.assign(this, { name });
  }
}

/**
 * ユーザの集合
 */
export class Users {
  constructor(users) {
    Object.assign(this, { users });
  }

  length() {
    return this.users.length;
  }

  merge(other) {
    const users = [];
    users.push(...this.users, ...other.users);
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
