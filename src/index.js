import { User } from './users.js';
import { Message } from './message.js';
import { Like } from './like.js';
import { Reactions } from './reactions.js';

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

//////////////////////////////////////////////////////////////////////
const charMap = {
  '&': '&amp;',
  "'": '&#x27;',
  '`': '&#x60;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
};

const html = (callSites, ...substitutions) => {
  const escapedSubstitutions = substitutions.map(value =>
    value.toString().replace(/[&\\`'"<>]/g, match => charMap[match])
  );

  const htmlString = String.raw(callSites, ...escapedSubstitutions);

  const template = document.createElement('template');
  template.innerHTML = htmlString;

  return template.content;
};

const reactions = reactions => {
  const h = html`
    <div
      style="
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    width: 80%;
  "
    ></div>
  `;

  const container = h.firstChild;
  for (const r of reactions) {
    container.appendChild(reaction(r));
  }

  return h;
};

const reaction = reaction => html`
  <div class="typetalk_emoreact_reaction">
    <div class="typetalk_emoreact_reaction--emoji">${reaction.emoji}</div>
    <div class="typetalk_emoreact_reaction--users">
      ${
        Array.from(reaction.users)
          .map(u => u.name)
          .join(',')
      }
    </div>
  </div>
`;

const showMessages = messages => {
  messages.forEach(message => {
    const found = document.querySelector(`a[ng-href="${message.postUrl}"]`);

    if (!found) return;

    const reactionsDom = reactions(message.reactions);

    const messageContainer = found.parentNode.parentNode.parentNode;
    const messageOptions = messageContainer.querySelector(
      '.message__option-wrap'
    );

    messageContainer.insertBefore(reactionsDom, messageOptions.nextSibilings);
  });
};

// メインの処理
window.addEventListener('load', function() {
  setTimeout(function() {
    const style = html`
      <style>
        .typetalk_emoreact_reaction {
          display: flex;
          flex-direction: row;
        }

        .typetalk_emoreact_reaction--emoji {
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-left: 5px;
        }
        .typetalk_emoreact_reaction--users {
          display: none;
          opacity: 0;
        }

        .typetalk_emoreact_reaction:hover .typetalk_emoreact_reaction--users {
          display: block;
          opacity: 1;
          transition: opacity 0.5s linear 0s;
        }
      </style>
    `;
    document.head.appendChild(style);

    const messages = getMessageNodes().map(buildMessage);

    const messagesWithReactions = messages.map(message => {
      const reactions = Reactions.fromLikes(message.likes);
      return message.withReactions(reactions);
    });

    console.log(messagesWithReactions);

    showMessages(messagesWithReactions);
  }, 2000);
});
