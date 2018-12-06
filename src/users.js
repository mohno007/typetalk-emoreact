export class User {
  constructor(name) {
    Object.assign(this, { name });
  }
}

export class Users {
  constructor(users) {
    Object.assign(this, { users });
  }

  length() {
    return this.users.length;
  }
}
