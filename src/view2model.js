import { User } from './users.js';
import { Message } from './message.js';
import { Like } from './like.js';

// いいねのリストを作る
const buildLikes = (messageNode) => {
  const ttLike = messageNode.querySelector('tt-message-like');
  /* global angular */
  const controller = angular.element(ttLike).data().$ttMessageLikeController;
  const likes = controller.post.likes;

  return likes.map((like) => {
    const user = new User(like.account.fullName);
    return like.comment.length === 0
      ? Like.noComment(user)
      : Like.withComment(user, like.comment);
  });
};

// メッセージを構築する
const buildMessage = (messageNode) => {
  const postUrlOpt = messageNode.querySelector('a[ng-href]');
  const postUrl = postUrlOpt && postUrlOpt.getAttribute('ng-href');
  const user = new User('');
  const likes = buildLikes(messageNode);

  const msg = new Message(postUrl, user, likes);
  msg.raw = messageNode;

  return msg;
};

export const buildMessages = () =>
  Array.from(document.querySelectorAll('.messages tt-message')).map(
    buildMessage
  );

export const currentUser = () => {
  // TODO ここの取得もいい感じにしたい
  let myNameOpt = document.querySelector('.profile-content__name');
  myNameOpt =
    myNameOpt &&
    (myNameOpt.textContent.match(/(.*) さん/) ||
      myNameOpt.textContent.match(/Hi, (.*)/));
  myNameOpt = myNameOpt && myNameOpt[1];

  if (!myNameOpt) return;

  const myName = myNameOpt;

  return new User(myName);
};
