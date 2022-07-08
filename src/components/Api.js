export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._authorization = this._options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err)
    })
  }

}