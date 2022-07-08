import Popup from "./Popup.js";

export class PopupRemoveCard extends Popup {
  constructor (popupSelector, popupConfig) {
    super(popupSelector, popupConfig)
    this._deleteButton = this.popup.querySelector('#button-delete');
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteButton.addEventListener('click', () => {
    })
  }
}