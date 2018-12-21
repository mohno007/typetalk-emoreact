const sanitizeMap = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&#x27;',
  '`': '&#x60;',
  '"': '&quot;',
};

const html = (callSites, ...substitutions) => {
  const escapedSubstitutions = substitutions.map(value =>
    value.toString().replace(/[<>&\\`'"]/g, match => sanitizeMap[match])
  );

  const htmlString = String.raw(callSites, ...escapedSubstitutions);

  const template = document.createElement('template');
  template.innerHTML = htmlString;

  return template.content;
};

export const style = html`
  <style>
    .typetalk_emoreact_reactions {
      position: absolute;
      bottom: 8px;
      right: 90px;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 5px;
      display: flex;
      flex-direction: row;
    }

    .typetalk_emoreact_reactions--add_button {
      width: 2em;
      color: #aaa;
      border: 1px solid #ddd;
      border-radius: 1em;
      font-weight: bold;
      cursor: pointer;

      transition: box-shadow, color 0.2s linear 0s;
    }

    .typetalk_emoreact_reactions--add_button:focus {
      outline: 0;
    }

    .typetalk_emoreact_reactions--add_button:hover {
      color: #777;
      box-shadow: 0 0 2px #bbb;
    }

    .typetalk_emoreact_reactions--add_button:active {
      box-shadow: 0 0 1px #333;
    }

    .typetalk_emoreact_reaction--emoji-list {
      position: absolute;
      bottom: 2em;
      width: 10em;
      height: 4em;
      overflow-y: scroll;

      padding: 0.25em 0.75em;
      border: 1px solid #ddd;
      border-radius: 10px;

      background: #fff;

      transition: opacity 0.2s linear 0s;
    }

    .typetalk_emoreact_reaction--emoji {
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-left: 5px;

      transition: box-shadow 0.2s linear 0s;
    }

    .typetalk_emoreact_reaction--emoji:focus {
      outline: 0;
    }

    .typetalk_emoreact_reaction--emoji:hover {
      box-shadow: 0 0 2px #bbb;
    }

    .typetalk_emoreact_reaction--emoji:active {
      box-shadow: 0 0 1px #333;
    }

    .typetalk_emoreact_reaction--emoji__emoji {
      display: inline-block;
      font-size: 4em;
      transform: scale(0.25) translateY(1.1em);
      margin: -1em -0.333em;
      cursor: pointer;
    }

    .typetalk_emoreact_reaction--users {
      visibility: hidden;
      position: absolute;
      bottom: 2.6em;
      opacity: 0;
      transition: opacity 0.2s linear 0s;

      width: max-content;
      max-width: 20vw;

      background: rgba(80, 80, 80, 0.8);
      padding: 0.5em 1em;
      border-radius: 10px;
      color: white;
      font-size: 0.8em;
    }

    :hover > .typetalk_emoreact_reaction--users {
      visibility: visible;
      opacity: 1;
    }
  </style>
`;

// リアクションの一覧を出す
export const reactions = (state, actions, reduce) => {
  const { reactions, showEmojiList } = state;
  const h = html`
    <div class="typetalk_emoreact_reactions">
      <button class="typetalk_emoreact_reactions--add_button">＋</button>
      <div
        class="typetalk_emoreact_reaction--emoji-list"
        style="visibility: ${showEmojiList ? 'visible' : 'hidden'}"
      >
        😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣😣
      </div>
    </div>
  `;

  const addButton = h.querySelector('.typetalk_emoreact_reactions--add_button');
  addButton.addEventListener('click', () => {
    !showEmojiList
      ? reduce(actions.showEmojiList())
      : reduce(actions.hideEmojiList());
  });

  const container = h.firstElementChild;
  for (const r of reactions) {
    container.appendChild(reaction(r, actions, reduce));
  }

  return h;
};

// 単一のリアクションを出す
const reaction = (reaction, actions, reduce) => {
  const h = html`
    <div class="typetalk_emoreact_reaction">
      <button class="typetalk_emoreact_reaction--emoji">
        <span class="typetalk_emoreact_reaction--emoji__emoji">
          ${reaction.emoji}
        </span>
      </button>
      <div class="typetalk_emoreact_reaction--users">
        ${
          Array.from(reaction.users)
            .map(u => u.name)
            .join(',')
        }
      </div>
    </div>
  `;

  const query = '.typetalk_emoreact_reaction--emoji';
  h.querySelector(query).addEventListener('click', ev => {
    ev.preventDefault();
    reduce(actions.addEmoji());
  });

  return h;
};
