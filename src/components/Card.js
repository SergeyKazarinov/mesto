export class Card {
  constructor({item}, cardSelector, myId, openPopupImage, openDeletePopup) {
    this._name = item.name;
    this._link = item.link;
    this._numberLikes = item.likes.length;
    this._item = item;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._myId = myId;
    this.__cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
    this._openDeletePopup = openDeletePopup;
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

  _openPopup = () => {
    this._openDeletePopup(this);
  }
  /** Удаление карточки */
  removeImage = () => {
    this._element.remove();
  }

  _handleImageClick = () => {
    this._openPopupImage({name: this._name, link: this._link});
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.button_type_like');

    this._likeButton.addEventListener ('click', this._like); //лайк
    this._element.querySelector('.button_type_remove').addEventListener('click', this._openPopup); //Удаление картинки
    this._element.querySelector('.button_type_card').addEventListener('click', this._handleImageClick); //открытие картинки
  }

  _activeRemoveButton() {
    if(this._ownerId === this._myId) {
      this._element.querySelector('.button_type_remove').classList.add('button_type_remove-active');
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likes = this._element.querySelector('.card__like-item');
    this._setEventListeners();
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
    this._likes.textContent = this._numberLikes;
    this._activeRemoveButton();
    return this._element;
  }
}