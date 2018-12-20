import { User } from './users.js';
import { Message } from './message.js';
import { Like } from './like.js';
import { Reactions } from './reactions.js';
import * as view from './view.js';

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

const getMessageNodes = () =>
  Array.from(document.querySelectorAll('.message > .message__post'));

const showMessages = messages => {
  messages.forEach(message => {
    const found = document.querySelector(`a[ng-href="${message.postUrl}"]`);

    if (!found) return;

    const reactionsDom = view.reactions(
      message.reactions,
      { addEmoji: () => {} },
      () => {}
    );

    const messageContainer = found.parentNode.parentNode.parentNode;
    const messageOptions = messageContainer.querySelector(
      '.message__option-wrap'
    );

    messageContainer.insertBefore(reactionsDom, messageOptions.nextSibilings);
  });
};

// Application Service相当ぐらいのやつ？
const renderMessages = () => {
  const messages = getMessageNodes().map(buildMessage);

  const messagesWithReactions = messages.map(message => {
    const reactions = Reactions.fromLikes(message.likes);
    return message.withReactions(reactions);
  });

  console.log(messagesWithReactions);

  showMessages(messagesWithReactions);
};

/*
const removeMessages = () => {
  Array.from(document.querySelectorAll('.typetalk_emoreact_reaction')).forEach(
    e => e.remove()
  );
};
*/

const loadEmoreact = () => {
  setTimeout(function() {
    document.head.appendChild(view.style);
    renderMessages();

    /*
    const messagesContainer = document.querySelector('.js_message');
    const observer = new MutationObserver(() => {
      observer.disconnect();
      observer.takeRecords();
      removeMessages();
      renderMessages();
      observe();
    });
    const observe = () =>
      observer.observe(messagesContainer, { childList: true, subtree: true });

    observe();
    */
  }, 1000);
};

// メインの処理
window.addEventListener('load', function() {
  loadEmoreact();

  let url = location.href;
  setInterval(() => {
    if (url === location.href) return;

    url = location.href;
    setTimeout(renderMessages, 100);
  }, 1000);
});
