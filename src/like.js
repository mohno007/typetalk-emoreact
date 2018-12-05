/**
 * あるメッセージに対するいいねの集合
 */
export class Like {
  constructor(user, message) {
    Object.assign(this, { user, message });
  }
}
