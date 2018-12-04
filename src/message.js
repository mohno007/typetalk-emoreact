/**
 * メッセージ
 */
export class Message {
  constructor(id, user, likes) {
    Object.assign(this, { id, user, likes });
  }
}
