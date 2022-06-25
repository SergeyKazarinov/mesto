import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig, {imageSelector, captionSelector}) {
    // console.log(`popupSelector: "${popupSelector}", \nimageSelector "${imageSelector}", \ncaptionSelector "${captionSelector}", \npopupConfig: `);
    // console.dir(popupConfig);
    super(popupSelector, popupConfig);
    this._imageSelector = imageSelector;
    this._captionSelector = captionSelector;
    this._imageElement = document.querySelector(`.${this._imageSelector}`);
    this._captionElement = document.querySelector(`.${this._captionSelector}`);
    console.dir(this._imageElement);
    console.dir(this._captionElement);
  }

  open({name, link}) {
    // console.log(`name: "${name}", link: "${link}", \nthis:`);
    // console.dir(this);
    console.log(this._imageSelector);
    console.log(this._imageElement.alt);
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}