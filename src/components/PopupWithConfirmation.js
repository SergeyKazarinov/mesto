import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor (popupSelector, popupConfig, confirmationButtonSelector, removeCardCallback) {
    super(popupSelector, popupConfig);
    this._confirmationButton = this._popup.querySelector(`.${confirmationButtonSelector}`);
    this._removeCardCallback = removeCardCallback;
  }

  _removeCard = () => {
    this._removeCardCallback(this._data);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', this._removeCard)
  }

  open(data) {
    this._data = data;
    super.open();
  }
  
  close() {
    super.close();
  }
}