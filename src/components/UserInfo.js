export class UserInfo {
  constructor({titleSelector, jobSelector, avatarSelector}) {
    this._titleSelector = titleSelector;
    this._jobSelector = jobSelector;
    this._titleElement = document.querySelector(`.${this._titleSelector}`);
    this._jobElement = document.querySelector(`.${this._jobSelector}`);
    this._avatarElement = document.querySelector(`.${avatarSelector}`);
  }

  setUserInfo = (data) => {
    this._titleElement.textContent = data.title || '';
    this._jobElement.textContent = data.job || '';
    this._avatarElement.src = data.avatar || '';
    this._myId = data.id || '';
  }

  getUserInfo = () => {
    return {title: this._titleElement.textContent, job: this._jobElement.textContent, avatar: this._avatarElement.src, id: this._myId};
  }
}