import Popup from "./Popup.js";
import { popupImage, popupText } from "./constants.js";

export class PopupWithImage extends Popup {
  constructor(cardSelector, link, name) {
    super(cardSelector);
    this._popupImage = popupImage;
    this._popupText = popupText;
    this._link = link;
    this._name = name;
  }

  open() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupText.textContent = this._name;
    super.open();
  }
}