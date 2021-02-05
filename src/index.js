import { Reactions } from './reactions.js';
import { Message } from './message.js';
import { Like } from './like.js';
import { User } from './users.js';
import * as view from './view.js';
import * as view2model from './view2model.js';
import { createSideEffect } from './sideeffect.js';
import { Typetalk } from './typetalk_request.js';

// const sleep = x => new Promise(res => setTimeout(res, x));

const mount = (root, view, actions, initialState) => {
  const reduce = (state) => async (reducer) => {
    const _reducer = await reducer;
    const newState = _reducer(state);
    const newView = view(newState, actions, reduce(newState));

    Array.from(root.childNodes).forEach((node) => root.removeChild(node));
    root.appendChild(newView);
  };

  reduce(initialState)((e) => e);
};

const actions = {
  // TODO もうちょっとマシなアクション名考えたい
  updateLikeOk: (newComment) => (state) => {
    // TODO ここの責務じゃないし危ないし、何やってるか分かりづらい
    const newMessage = new Message();
    Object.assign(newMessage, state.message);
    newMessage.likes = [...state.message.likes];
    const index = newMessage.likes.findIndex((l) => l.user.equals(state.me));

    if (index < 0) {
      newMessage.likes.push(Like.withComment(state.me, newComment));
    } else {
      newMessage.likes.splice(index, 1, Like.withComment(state.me, newComment));
    }

    newMessage.reactions = Reactions.fromLikes(newMessage.likes);

    return {
      ...state,
      message: newMessage,
    };
  },

  updateSearchText: (text) => (state) => ({
    ...state,
    searchText: text,
  }),

  showEmojiList: () => (state) => ({
    ...state,
    showEmojiList: true,
  }),

  hideEmojiList: () => (state) => ({
    ...state,
    showEmojiList: false,
  }),
};

const typetalkSideEffect = (typetalk) =>
  createSideEffect((actions) => ({
    async updateLike(messageId, newComment) {
      // TODO ここでtopicId引いてきてるのダサいので直したい
      const topicId = location.href.match(/topics\/(\d+)/)[1];

      try {
        await typetalk.unlike(topicId, messageId);
      } catch (e) {
        console.log(e);
      }

      try {
        await typetalk.like(topicId, messageId, newComment);

        // state.reactions.reactions.delete('😣'); みたいな

        return actions.updateLikeOk(newComment);
      } catch (e) {
        window.alert(`失敗: ${e}`);
        return actions.updateLikeFailed();
      }
    },
  }));

const createState = (message, me) => ({
  state: 'INITIAL',
  message,
  me,
  showEmojiList: false,
  searchText: '',
});

const mountEmoreact = (messages) => {
  const typetalk = new Typetalk();
  const actions_ = typetalkSideEffect(typetalk)(actions);

  // TODO ここの取得もいい感じにしたい
  let myNameOpt = document.querySelector('.settings-menu-content__name');
  myNameOpt =
    myNameOpt &&
    (myNameOpt.textContent.match(/(.*) さん/) ||
      myNameOpt.textContent.match(/Hi, (.*)/));
  myNameOpt = myNameOpt && myNameOpt[1];

  if (!myNameOpt) {
    console.error(
      '名前の取得に失敗しました！Typetalkの仕様変更が行われたようです。開発者にお問い合わせください。'
    );
    return;
  }

  const myName = myNameOpt;

  messages.forEach((message) => {
    const found = document.querySelector(`a[ng-href="${message.postUrl}"]`);

    if (!found) return;

    const root = document.createElement('div');
    const messageContainer =
      found.parentNode.parentNode.parentNode.parentNode.parentNode;
    const messageOptions = messageContainer.querySelector(
      '.message__option-wrap'
    );
    if (!messageOptions)
      throw new Error(
        '描画対象のDOMの取得に失敗しました。開発者にお問い合わせください。'
      );

    messageOptions.parentNode.insertBefore(root, messageOptions.nextSibilings);

    mount(
      root,
      view.reactions,
      actions_,
      createState(message, new User(myName))
    );
  });
};

const renderMessages = () => {
  const messages = view2model.buildMessages();

  const messagesWithReactions = messages.map((message) => {
    const reactions = Reactions.fromLikes(message.likes);
    return message.withReactions(reactions);
  });

  console.log(messagesWithReactions);

  mountEmoreact(messagesWithReactions);
};

/*
const removeMessages = () => {
  Array.from(document.querySelectorAll('.typetalk_emoreact_reaction')).forEach(
    e => e.remove()
  );
};
*/

const loadEmoreact = () => {
  setTimeout(function () {
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
window.addEventListener('load', function () {
  loadEmoreact();

  let url = location.href;
  setInterval(() => {
    if (url === location.href) return;

    url = location.href;
    setTimeout(renderMessages, 500);
  }, 1000);
});
