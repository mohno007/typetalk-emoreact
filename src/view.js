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
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 5px;
      width: 80%;
      display: flex;
      flex-direction: row;
    }

    .typetalk_emoreact_reactions--button {
      width: 2em;
      color: #aaa;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 1em;
      font-weight: bold;
    }

    .typetalk_emoreact_reaction--emoji {
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-left: 5px;
      cursor: pointer;
    }

    .typetalk_emoreact_reaction--emoji__emoji {
      display: inline-block;
      font-size: 4em;
      transform: scale(0.25) translateY(1.1em);
      margin: -1em -0.333em;
    }

    .typetalk_emoreact_reaction--users {
      visibility: hidden;
      position: absolute;
      opacity: 0;
      transition: opacity 0.2s linear 0s;
      margin-top: -5em;

      background: rgba(80, 80, 80, 0.8);
      padding: 0.5em 1em;
      border-radius: 10px;
      color: white;
    }

    :hover > .typetalk_emoreact_reaction--users {
      visibility: visible;
      opacity: 1;
    }
  </style>
`;

// リアクションの一覧を出す
export const reactions = (reactions, actions, reduce) => {
  const h = html`
    <div class="typetalk_emoreact_reactions">
      <button class="typetalk_emoreact_reactions--button">＋</button>
    </div>
  `;

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
      <div class="typetalk_emoreact_reaction--emoji">
        <button class="typetalk_emoreact_reaction--emoji__emoji">
          ${reaction.emoji}
        </span>
      </div>
      <div class="typetalk_emoreact_reaction--users">
        ${Array.from(reaction.users)
          .map(u => u.name)
          .join(',')}
      </div>
    </div>
  `;

  const query = '.typetalk_emoreact_reaction--emoji';
  h.querySelector(query).addEventListener('click', () => {
    reduce(actions.addEmoji());
  });

  return h;
};
