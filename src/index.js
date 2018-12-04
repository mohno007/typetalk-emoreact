window.addEventListener('load', function() {
  /**
   * いいね
   */
  class Like {
    constructor(user, message) {
      Object.assign(this, { user, message });
    }
  }

  class Message {
    constructor(id, user, likes) {
      Object.assign(this, { id, user, likes });
    }
  }

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
        throw new Error('tooltipが意図しないフォーマットで記述されています');
      }

      const { comment, username } = match.groups;

      return new Like(username, comment);
    }

    const c = node.getAttribute('c');

    if (c) {
      return new Like(c, '');
    }
  };

  const buildLikes = messageNode =>
    Array.from(
      messageNode.querySelectorAll(
        '.message-like__users > .message-like__users-inner'
      )
    )
      .map(buildLike)
      .filter(e => e !== null);

  const buildMessage = messageNode => {
    const idOpt = messageNode.querySelector('a[ng-href]');
    const id = idOpt === null ? null : idOpt.href;
    const user = '';
    const likes = buildLikes(messageNode);

    const msg = new Message(id, user, likes);
    msg.raw = messageNode;
    return msg;
  };

  const getMessages = () =>
    Array.from(document.querySelectorAll('.message > .message__post'));

  console.log(getMessages().map(buildMessage));

  // User
  // Messages
  // Message
  // Likes(likes)
  // Like(user, message)
  // Emoji(value)
  // Reaction(user, reactions)
  //
  // Messages
  //   -> (Likes -> Reactions)
  //   -> Messages
});
