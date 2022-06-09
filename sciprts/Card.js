/** template и блок для вставки */

const newCard = document.querySelector('.elements__grid');
const buttonLike = document.querySelector('.button_type_like');

/** массив для заполнения страницы 6 фотографиями */
const initialCards = [
  {
    name: 'Скала у берега',
    link: './images/Image1.jpg'
  },
  {
    name: 'Причал',
    link: './images/Image2.jpg'
  },
  {
    name: 'Ночной маяк',
    link: './images/Image3.jpg'
  },
  {
    name: 'Водопад',
    link: './images/Image4.jpg'
  },
  {
    name: 'Зимний берег',
    link: './images/Image5.jpg'
  },
  {
    name: 'Котейка',
    link: './images/Image6.jpg'
  }
];

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this.__cardSelector = cardSelector;
  }


  _getTemplate() {
    const cardTemplate = document.querySelector('#cards').content.querySelector('.card').cloneNode(true)
  
    return cardTemplate;
  }

  _like() {
    this._element.querySelector('.button_type_like').classList.toggle('button_type_like-active');
  }

  _setEventListeners() {
    this._element.querySelector('.button_type_like').addEventListener ('click', ()=> {
      this._like();
    }); //лайк
	  // this._element.querySelector('.button_type_remove').addEventListener('click', removeImage); //Удаление картинки
	  // this._element.querySelector('.button_type_card').addEventListener('click', () => openPopupImage(cardData.link, cardData.name)); //открытие картинки
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

initialCards.forEach(item => {
  const card = new Card(item, newCard);
  const cardElement = card.generateCard();

  newCard.append(cardElement);
});

