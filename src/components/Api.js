export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkAnswer(res) {
    if(res.ok) {
      return res.json();
    }else {
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.job
      })
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  patchAvatarInfo(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => {
      return this._checkAnswer(res);
    })
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  setLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._item._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._item._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._checkAnswer(res);
      })
  }
}