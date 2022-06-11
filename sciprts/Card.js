import { openPopupImage } from "./script.js";

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this.__cardSelector = cardSelector;
  }

  /** Создание template */
  _getTemplate() {
    const cardTemplate = document.getElementById('cards').content.querySelector('.card').cloneNode(true)
  
    return cardTemplate;
  }
  /** лайк */
  _like() {
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like-active');
  }
  /** Удаление карточки */
  _removeImage() {
    this._element.closest('.card').remove();
  }

  /** открытие попап с картинкой */
  _openPopupImage() {
    openPopupImage(this._link, this._name);
  }

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener ('click', () => this._like()); //лайк
    this._element.querySelector('.button_type_remove').addEventListener('click', () => this._removeImage()); //Удаление картинки
    this._element.querySelector('.button_type_card').addEventListener('click', () => this._openPopupImage()); //открытие картинки
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._link;
    this._element.querySelector('.card__text').textContent = this._name;
    
    return this._element;
  }
}

