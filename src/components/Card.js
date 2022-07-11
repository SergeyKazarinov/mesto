export class Card {
  constructor({item}, cardSelector, myId, openPopupImage, openDeletePopup, api) {
    this._item = item;
    this._name = item.name;
    this._link = item.link;
    this._numberLikes = item.likes.length;
    this._myId = myId;
    this.__cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
    this._openDeletePopup = openDeletePopup;
    this._api = api;
  }

  /** Создание template */
  _getTemplate() {
    const cardTemplate = this.__cardSelector.cloneNode(true)
    return cardTemplate;
  }

  /** лайк */
  _like = () => {
    if(!this._hasMyLikes(this._item.likes)){
      this._api.setLike(this._item)
      .then((result) => {
        this._likes.textContent = result.likes.length;
        this._likeButton.classList.add('button_type_like-active');
        this._item.likes = result.likes;
      })
    } else {
      this._api.deleteLike(this._item)
      .then((result) => {
        this._likes.textContent = this._item.likes.length - 1;
        this._likeButton.classList.remove('button_type_like-active');
        this._item.likes = result.likes;
      })
      .catch((err) => {
        console.log(err)
      })
    }
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
    

    this._likeButton.addEventListener ('click', this._like); //лайк
    this._element.querySelector('.button_type_remove').addEventListener('click', this._openPopup); //Удаление картинки
    this._element.querySelector('.button_type_card').addEventListener('click', this._handleImageClick); //открытие картинки
  }

  _activeRemoveButton() {
    if(this._item.owner._id === this._myId) {
      this._element.querySelector('.button_type_remove').classList.add('button_type_remove-active');
    }
  }

  _hasMyLikes() {
    return this._item.likes.some(element => {
      return element._id === this._myId;
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._likes = this._element.querySelector('.card__like-item');
    this._likeButton = this._element.querySelector('.button_type_like');
    this._setEventListeners();
    
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__text').textContent = this._name;
    this._likes.textContent = this._numberLikes;

    if(this._hasMyLikes(this._item.likes)) {
      this._likeButton.classList.add('button_type_like-active');
    }
    this._activeRemoveButton();
    return this._element;
  }
}