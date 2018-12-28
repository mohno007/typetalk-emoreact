// prettier-ignore
const buildRequest = bodyObject => ({
  method: 'POST',
  headers: new Headers({
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'ja,en-US;q=0.8,en;q=0.6',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': 'https://typetalk.in',
    'X-Requested-With': 'XMLHttpRequest',
  }),
  body: JSON.stringify(bodyObject),
  credentials: 'include',
});

export class Typetalk {
  async like(topicId, messageId, comment = undefined) {
    const requestBody = {};

    if (comment !== undefined) {
      requestBody.comment = comment;
    }

    const request = buildRequest(requestBody);

    return await fetch(
      `/topics/${topicId}/posts/${messageId}/like.json`,
      request
    ).then(res =>
      res.status === 200
        ? res.json()
        : Promise.reject(new Error('リクエストに失敗しました'))
    );
  }

  async unlike(topicId, messageId) {
    const request = buildRequest({});

    return await fetch(
      `/topics/${topicId}/posts/${messageId}/unlike.json`,
      request
    ).then(res =>
      res.status === 200
        ? res.json()
        : Promise.reject(new Error('リクエストに失敗しました'))
    );
  }
}
