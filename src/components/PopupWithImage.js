import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig, {imageSelector, captionSelector}) {
    super(popupSelector, popupConfig);
    this._imageSelector = imageSelector;
    this._captionSelector = captionSelector;
    this._newPlacePopup = document.querySelector(`.${this._popupSelector}`);
    this._imageElement = this._newPlacePopup.querySelector(`.${this._imageSelector}`);
    this._captionElement = this._newPlacePopup.querySelector(`.${this._captionSelector}`);
  }

  open({name, link}) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}