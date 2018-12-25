import { Reactions } from './reactions.js';
import * as view from './view.js';
import * as view2model from './view2model.js';
import { Typetalk } from './typetalk_request.js';

const actions = (/*typetalk*/) => ({
  addReaction: (/*message, emoji*/) => async state => {
    // const myReactions = message.reactions.findByUser(state.me);

    try {
      // await typetalk.like(topicId, messageId, emoji);

      // state.reactions.reactions.delete('😣'); みたいな
      return state;
    } catch (e) {
      window.alert(`失敗: ${e}`);
      return state;
    }
  },

  addReactionOk: (/* emoji */) => state => ({
    ...state,
    /*state.reactions*/
  }),

  showEmojiList: () => state => ({
    ...state,
    showEmojiList: true,
  }),

  hideEmojiList: () => state => ({
    ...state,
    showEmojiList: false,
  }),
});

const createState = message => ({
  message,
  state: 'INITIAL',
  showEmojiList: false,
});

const mount = (root, view, actions, state) => {
  const reduce = state => async reducer => {
    const newState = await reducer(state);
    const newView = view(newState, actions, reduce(newState));

    Array.from(root.childNodes).forEach(node => root.removeChild(node));
    root.appendChild(newView);
  };

  reduce(state)(e => e);
};

const mountEmoreact = messages => {
  const typetalk = new Typetalk();
  const actions_ = actions(typetalk);

  messages.forEach(message => {
    const found = document.querySelector(`a[ng-href="${message.postUrl}"]`);

    if (!found) return;

    const root = document.createElement('div');
    const messageContainer = found.parentNode.parentNode.parentNode;
    const messageOptions = messageContainer.querySelector(
      '.message__option-wrap'
    );

    messageContainer.insertBefore(root, messageOptions.nextSibilings);

    mount(root, view.reactions, actions_, createState(message));
  });
};

const renderMessages = () => {
  const messages = view2model.buildMessages();

  const messagesWithReactions = messages.map(message => {
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
