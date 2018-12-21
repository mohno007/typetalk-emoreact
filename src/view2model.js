import { User } from './users.js';
import { Message } from './message.js';
import { Like } from './like.js';

const notNull = e => e !== null;

// いいね を作る
const buildLike = likeNode => {
  const node = likeNode.querySelector('img[tt-effect-like=""]');

  if (node === null) {
    return null;
  }

  const tooltip = node.getAttribute('tt-tooltip');

  if (tooltip) {
    // いったん名前に" by "が含まれている場合を考慮しない
    const match = tooltip.match(/(?<comment>.*) by (?<username>.*)/);

    // マッチしない場合は名前のみで、コメントがないものとみなす
    if (match === null) {
      const username = tooltip;
      const user = new User(username);
      return Like.noComment(user);
    }

    const { comment, username } = match.groups;
    const user = new User(username);

    return Like.withComment(user, comment);
  }

  const c = node.getAttribute('c');

  if (c) {
    const user = new User(c);
    return Like.noComment(user);
  }

  throw new Error(
    'いいねの抽出に必要な含まれていません。破壊的変更が行われたと考えられるため、作者に連絡してください。'
  );
};

// いいねのリストを作る
const buildLikes = messageNode =>
  Array.from(
    messageNode.querySelectorAll(
      '.message-like__users > .message-like__users-inner > .message-like__users-img'
    )
  )
    .map(buildLike)
    .filter(notNull);

// メッセージを構築する
const buildMessage = messageNode => {
  const postUrlOpt = messageNode.querySelector('a[ng-href]');
  const postUrl =
    postUrlOpt === null ? null : postUrlOpt.getAttribute('ng-href');
  const user = new User('');
  const likes = buildLikes(messageNode);

  const msg = new Message(postUrl, user, likes);
  msg.raw = messageNode;

  return msg;
};

export const buildMessages = () =>
  Array.from(document.querySelectorAll('.message > .message__post')).map(
    buildMessage
  );
