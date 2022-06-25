import { PopupWithImage } from "./PopupWithImage.js";
import { popupImageZoom } from "./constants.js";

export class Card {
  constructor({item}, cardSelector, openPopupImage) {
    this._name = item.name;
    this._link = item.link;
    this.__cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
  }

  /** Создание template */
  _getTemplate() {
    const cardTemplate = this.__cardSelector.cloneNode(true)
    return cardTemplate;
  }

  /** лайк */
  _like = () => {
    this._likeButton.classList.toggle('button_type_like-active');
  }

  /** Удаление карточки */
  _removeImage = () => {
    this._element.remove();
  }

  _handleImageClick = () => {
    this._openPopupImage({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.button_type_like');

    this._likeButton.addEventListener ('click', this._like); //лайк
    this._element.querySelector('.button_type_remove').addEventListener('click', this._removeImage); //Удаление картинки
    this._element.querySelector('.button_type_card').addEventListener('click', this._handleImageClick); //открытие картинки
  }

  generateCard() {
    
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._setEventListeners();
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
    return this._element;
  }
}