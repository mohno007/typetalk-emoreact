import emojiRegex from 'emoji-regex';

// リアクション
// 絵文字とそれをつけたユーザから成る。
export class Reaction {
  constructor(emoji, users) {
    Object.assign(this, { emoji, users });
  }

  // リアクションをつけたユーザの数
  count() {
    return this.users.length();
  }
}

// 単一のメッセージに対するリアクションの集合
export class Reactions {
  static fromLike(like) {
    // リアクションを抽出する責務はReaction側
    const regex = emojiRegex();

    const reactions = new Map();
    let match;

    while ((match = regex.exec(like.comment))) {
      const emoji = match[0];

      if (reactions.has(emoji)) {
        const users = reactions.get(emoji);
        users.push(like.user);
      } else {
        reactions.set(emoji, [like.user]);
      }
    }

    return new Reactions(reactions);
  }

  constructor(reactions) {
    Object.assign(this, { reactions });
  }

  forEach(f) {
    for (const [emoji, users] of this.reactions) {
      f(new Reaction(emoji, users));
    }
  }
}
