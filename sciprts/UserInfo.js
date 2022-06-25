export class UserInfo {
  constructor({titleSelector, jobSelector}) {
    this._titleSelector = titleSelector;
    this._jobSelector = jobSelector;
    this._titleElement = document.querySelector(`.${this._titleSelector}`);
    this._jobElement = document.querySelector(`.${this._jobSelector}`);
    
    console.dir(this._titleElement);
    console.dir(this._jobElement);
  }

  setUserInfo = (data) => {
    console.dir(data);
    this._titleElement.textContent = data.title || '';
    this._jobElement.textContent = data.job || '';
  }

  getUserInfo = () => {
    console.dir(this);
    console.dir(this._titleElement);
    console.dir(this._jobElement);
    console.dir({title: this._titleElement.textContent, job: this._jobElement.textContent});
    return {title: this._titleElement.textContent, job: this._jobElement.textContent};
  }

}