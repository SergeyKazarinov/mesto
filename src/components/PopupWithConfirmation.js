import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor (popupSelector, popupConfig, confirmationButtonSelector, api) {
    super(popupSelector, popupConfig);
    this._confirmationButton = this._popup.querySelector(`.${confirmationButtonSelector}`);
    this._api = api;
  }

  removeCard(data) {
    this._api.deleteCard(data._cardId)
      .then(() => {
        data.removeImage();
      });
    this.close();
  }

  setEventListeners(data) {
    super.setEventListeners();
    this.function = () => {this.removeCard(data)};
    this._confirmationButton.addEventListener('click', this.function)
  }

  close() {
    this._confirmationButton.removeEventListener('click', this.function);
    super.close();
  }
}