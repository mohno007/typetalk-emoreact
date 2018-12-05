import { Like } from './like.js';
import { Message } from './message.js';

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

    if (match === null) {
      const username = tooltip;
      return new Like(username, '');
    }

    const { comment, username } = match.groups;

    return new Like(username, comment);
  }

  const c = node.getAttribute('c');

  if (c) {
    return new Like(c, '');
  }

  throw new Error(
    'いいねの抽出に必要な含まれていません。破壊的変更が行われたと考えられるため、作者に連絡してください。'
  );
};

// いいねのリストを作る
const buildLikes = messageNode =>
  Array.from(
    messageNode.querySelectorAll(
      '.message-like__users > .message-like__users-inner'
    )
  )
    .map(buildLike)
    .filter(notNull);

// メッセージを構築する
const buildMessage = messageNode => {
  const idOpt = messageNode.querySelector('a[ng-href]');
  const id = idOpt === null ? null : idOpt.href;
  const user = '';
  const likes = buildLikes(messageNode);

  const msg = new Message(id, user, likes);
  msg.raw = messageNode;

  return msg;
};

const getMessageNodes = () =>
  Array.from(document.querySelectorAll('.message > .message__post'));

// メインの処理
window.addEventListener('load', function() {
  const messages = getMessageNodes().map(buildMessage);

  messages.map(message => message);
});
