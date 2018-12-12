/**
 * メッセージ
 */
export class Message {
  constructor(postUrl, user, likes, reactions = undefined) {
    Object.assign(this, { postUrl, user, likes, reactions });
  }

  withReactions(reactions) {
    return new Message(this.postUrl, this.user, this.likes, reactions);
  }
}
