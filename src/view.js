//import nodeEmoji from 'node-emoji';
import { emojis } from './emoji.js';

const addChild = (parent, child) => {
  if (child == null) {
    // skip
  } else if (child instanceof Array) {
    child.forEach(c => addChild(parent, c));
  } else if (
    child instanceof HTMLElement ||
    child instanceof DocumentFragment
  ) {
    parent.appendChild(child);
  } else {
    parent.appendChild(document.createTextNode(child));
  }
};

const h = (name, props = {}, children = []) => {
  const elem =
    name && name.length > 0
      ? document.createElement(name)
      : document.createDocumentFragment();

  for (const [prop, value] of Object.entries(props)) {
    if (prop === 'class') {
      elem.className = value;
    } else if (prop.startsWith('on') && typeof value === 'function') {
      const eventName = prop.slice(2).toLowerCase();
      elem.addEventListener(eventName, value);
    } else if (prop === 'style' && typeof value === 'object') {
      Object.assign(elem.style, value);
    } else {
      elem[prop] = value;
    }
  }

  for (const child of children) {
    addChild(elem, child);
  }

  return elem;
};

export const style = document.createElement('style');
style.textContent = `
  :root {
    --ttemoreact-border: #eee;
    --ttemoreact-color: #777;
    --ttemoreact-button-color: #aaa;
    --ttemoreact-button-color-hover: #777;
    --ttemoreact-background: #fff;
    --ttemoreact-background-hover: #eee;
  }

  .theme-dark {
    --ttemoreact-border: #6e6e6e;
    --ttemoreact-color: #b3aba9;
    --ttemoreact-button-color: #b3aba9;
    --ttemoreact-button-color-hover: #f2f2f2;
    --ttemoreact-background: #3b3535;
    --ttemoreact-background-hover: #765752;
  }

  .typetalk_emoreact_reactions {
    position: absolute;
    bottom: 8px;
    right: 90px;
    border: 1px solid var(--ttemoreact-border);
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: row;
  }

  .typetalk_emoreact_reactions--add_button {
    width: 2em;
    color: var(--ttemoreact-button-color);
    border: 1px solid var(--ttemoreact-border);
    border-radius: 1em;
    font-weight: bold;
    cursor: pointer;

    transition: box-shadow, color 0.2s linear 0s;
  }

  .typetalk_emoreact_reactions--add_button:focus {
    outline: 0;
  }

  .typetalk_emoreact_reactions--add_button:hover {
    color: var(--ttemoreact-button-color-hover);
    box-shadow: 0 0 2px #bbb;
  }

  .typetalk_emoreact_reactions--add_button:active {
    box-shadow: 0 0 1px #333;
  }

  .typetalk_emoreact_reaction--emoji_list {
    position: absolute;
    bottom: 2em;
    right: 0;
    width: 15em;
    height: 8em;
    overflow-y: scroll;

    padding: 0.25em 0.75em;
    border: 1px solid var(--ttemoreact-border);
    border-radius: 10px;

    background: var(--ttemoreact-background);

    transition: opacity 0.2s linear 0s;
  }

  .typetalk_emoreact_reaction--emoji_list--button {
    font-size: 1.25em;
    outline: 0;
    cursor: pointer;
    padding: 0 0.1em;
    border-radius: 5px;
    transition: background 0.2s linear 0s;
  }

  .typetalk_emoreact_reaction--emoji_list--button:hover {
    background: var(--ttemoreact-background-hover);
  }

  .typetalk_emoreact_reaction--emoji {
    border: 1px solid var(--ttemoreact-border);
    border-radius: 5px;
    margin-left: 5px;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;

    transition: box-shadow 0.2s linear 0s;
  }

  .typetalk_emoreact_reaction--emoji__me {
    background: #fee;
  }

  .typetalk_emoreact_reaction--emoji:focus {
    outline: 0;
  }

  .typetalk_emoreact_reaction--emoji:hover {
    box-shadow: 0 0 2px #bbb;
  }

  .typetalk_emoreact_reaction--emoji:active {
    box-shadow: 0 0 1px #555;
  }

  .typetalk_emoreact_reaction--emoji__emoji {
    margin-left: 0.125em;
  }

  .typetalk_emoreact_reaction--emoji__count {
    margin-right: 0.125em;
    font-size: 0.9em;
    color: var(--ttemoreact-color);
  }

  .typetalk_emoreact_reaction--users {
    visibility: hidden;
    position: absolute;
    bottom: 2.6em;
    opacity: 0;
    transition: opacity 0.2s linear 0s;

    width: max-content;
    max-width: 10vw;

    background: rgba(80, 80, 80, 0.8);
    padding: 0.5em 1em;
    border-radius: 10px;
    color: white;
    font-size: 0.8em;

    word-break: break-all;
  }

  :hover > .typetalk_emoreact_reaction--users {
    visibility: visible;
    opacity: 1;
  }
`;

const emojiList = ({ message, me }, actions, reduce) => {
  const addEmoji = emoji => {
    // TODO ビューの責務ではないので必ず直す
    const like = message.likes.find(like => like.user.equals(me));
    const newComment = ((like && like.comment) || '') + emoji;
    reduce(actions.updateLike(message.postUrl.match(/(\d+)$/)[1], newComment));
  };

  return h(
    'div',
    {
      class: 'typetalk_emoreact_reaction--emoji_list',
    },
    [
      ...emojis.map(emoji =>
        h(
          'button',
          {
            class: 'typetalk_emoreact_reaction--emoji_list--button',
            onClick: () => addEmoji(emoji),
          },
          [emoji]
        )
      ),
    ]
  );
};

// リアクションの一覧を出す
export const reactions = ({ me, message, showEmojiList }, actions, reduce) => {
  const toggleEmojiList = () => {
    if (!showEmojiList) {
      reduce(actions.showEmojiList());
    } else {
      reduce(actions.hideEmojiList());
    }
  };

  const hideEmojiList = () => reduce(actions.hideEmojiList());

  return h(
    'div',
    {
      class: 'typetalk_emoreact_reactions',
      onMouseLeave: hideEmojiList,
    },
    [
      h(
        'button',
        {
          class: 'typetalk_emoreact_reactions--add_button',
          onClick: toggleEmojiList,
        },
        ['＋']
      ),
      showEmojiList ? emojiList({ me, message }, actions, reduce) : null,
      [...message.reactions].map(r =>
        reaction({ message, me, reaction: r }, actions, reduce)
      ),
    ]
  );
};

// 単一のリアクションを出す
const reaction = ({ me, message, reaction }, actions, reduce) => {
  const addEmoji = ev => {
    ev.preventDefault();
    // TODO ビューの責務ではないので必ず直す
    const like = message.likes.find(like => like.user.equals(me));
    const newComment = ((like && like.comment) || '') + reaction.emoji;
    reduce(actions.updateLike(message.postUrl.match(/(\d+)$/)[1], newComment));
  };

  return h('div', { class: 'typetalk_emoreact_reaction' }, [
    h(
      'button',
      {
        class: 'typetalk_emoreact_reaction--emoji',
        onClick: addEmoji,
      },
      [
        h('span', { class: 'typetalk_emoreact_reaction--emoji__emoji' }, [
          reaction.emoji,
        ]),
        h('span', { class: 'typetalk_emoreact_reaction--emoji__count' }, [
          reaction.count(),
        ]),
      ]
    ),
    h('div', { class: 'typetalk_emoreact_reaction--users' }, [
      [...reaction.users].map(u => u.name).join(', '),
    ]),
  ]);
};
