import { data } from "autoprefixer";

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
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err)
    })
  }

  patchUserInfo(data) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.title,
        about: data.job
      })
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

  patchAvatarInfo(data) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }else {
        return Promise.reject(`Ошибка ${res.status}`);
      }
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err)
    })
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err)
      })
  }
}