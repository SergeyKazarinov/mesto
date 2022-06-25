export default class Popup {
  constructor (popupSelector, popupConfig) {
    console.log(`popupSelector: "${popupSelector}", \npopupConfig: "${popupConfig}"`);
    this._popupSelector = popupSelector;
    this._activeModifier = popupConfig.activeModifier;
    
    this._closeBtnSelector = popupConfig.closeBtnSelector;
    
  }

  _handleEscClose = (event) => {
    if(event.key === "Escape") {
      this.close();
    }
  }

  _handleCLoseBtnClick = () => {
    this.close();
  }

  _handleCLoseOverlayClick = (ev) => {
    if(ev.target === ev.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup = document.querySelector(`.${this._popupSelector}`);
    this._closeBtn = this._popup.querySelector(`.${this._closeBtnSelector}`);
    this._popup.addEventListener('mousedown', this._handleCLoseOverlayClick);
    this._closeBtn.addEventListener('click', this._handleCLoseBtnClick);
  }

  open = () => {
    console.dir(this);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._activeModifier);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._activeModifier);
  }
}