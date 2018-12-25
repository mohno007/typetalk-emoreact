import emojiRegex from 'emoji-regex';
import nodeEmoji from 'node-emoji';

import { Users } from './users.js';

/**
 * Set同士のmergeを行う
 *
 * Setのオブジェクトに直接設定して使う想定。
 *
 * this: Set
 * @param {Set<K, V>} other 他のSet
 * @param {(key: K, selfValue: V, otherValue: V) => V} 衝突時の処理を描く
 * @return {Set<K, V>} 新しいSet
 */
function mergeSet(other, onConflict) {
  const result = this;

  for (const [key, otherValue] of other) {
    if (result.has(key)) {
      const selfValue = result.get(key);
      const v = onConflict(key, selfValue, otherValue);
      result.set(key, v);
    } else {
      result.set(key, otherValue);
    }
  }

  return result;
}

/**
 * リアクション
 * 絵文字とそれをつけたユーザから成る。
 */
export class Reaction {
  /**
   * @param {String} emoji 絵文字
   * @param {Users}  users ユーザの集合
   */
  constructor(emoji, users) {
    Object.assign(this, { emoji, users });
  }

  // リアクションをつけたユーザの数
  count() {
    return this.users.length();
  }
}

/**
 * 単一のメッセージに対するリアクションの集合
 */
export class Reactions {
  /**
   * @return {Reactions} 空のリアクション
   */
  static empty() {
    return new this(new Map());
  }

  /**
   * @param {Like} like いいね
   * @return {Reactions} リアクションの集合
   */
  static fromLike(like) {
    // リアクションを抽出する責務はReaction側
    const regex = emojiRegex();

    const reactions = new Map();

    if (like.noComment()) {
      reactions.set('❤️', [like.user]);
      return new Reactions(reactions);
    }

    let commentEmojified = nodeEmoji.emojify(like.comment);

    let match;
    while ((match = regex.exec(commentEmojified))) {
      const emoji = match[0];

      if (reactions.has(emoji)) {
        const users = reactions.get(emoji);
        users.push(like.user);
      } else {
        reactions.set(emoji, [like.user]);
      }
    }

    const hasNormalText = nodeEmoji.strip(commentEmojified).length > 0;
    if (hasNormalText) {
      reactions.set('💬', [like.user]);
      return new Reactions(reactions);
    }

    return new this(reactions);
  }

  /**
   * @param likes {Array<Like>} いいねの配列
   * @return {Reactions} リアクションの集合
   */
  static fromLikes(likes) {
    const reactions = likes.reduce(
      (reactions, like) => reactions.merge(this.fromLike(like)),
      this.empty()
    );

    return reactions;
  }

  /**
   * @param {Map<String, Array<User>>} reactions リアクションのMap
   */
  constructor(reactions) {
    // 内部では一貫して、Map<String, Array<User>>を用いる。
    // 外部に情報を公開するときは一貫して、Reaction型に変換して公開する
    Object.assign(this, { reactions });
  }

  merge(other) {
    const result = new Map();
    result.merge = mergeSet;

    const onConflict = (_, lhsUsers, rhsUsers) => [...lhsUsers, ...rhsUsers];

    result.merge(this.reactions, onConflict);
    result.merge(other.reactions, onConflict);

    return new this.constructor(result);
  }

  [Symbol.iterator]() {
    let self = this;
    return (function*() {
      for (const [emoji, users] of self.reactions) {
        yield new Reaction(emoji, new Users(users));
      }
    })();
  }
}
