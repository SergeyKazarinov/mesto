const popup = document.querySelector ('.popup');
const popupEditProfile = document.querySelector ('.popup_type_edit-profile');
const popupAddImage = document.querySelector ('.popup_type_add-image');
const popupEditOpenBtn = document.querySelector ('.button_type_edit');
const popupAddImageOpenBtn = document.querySelector ('.button_type_add');
const popupCloseBtnEditProfile = popupEditProfile.querySelector ('.button_type_close');
const popupCloseBtnAddImage = popupAddImage.querySelector ('.button_type_close');
const nameInput = document.querySelector ('.form__input_type_name');
const jobInput = document.querySelector ('.form__input_type_job');
const profileName = document.querySelector ('.profile__name');
const profileJob = document.querySelector ('.profile__job');
const formProfileEdit = document.querySelector('form[name=profile-edit');
const formAddImage = document.querySelector('form[name=add-image');

//функция открытия попапа
function addClassPopupEditProfile () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEditProfile.classList.add('popup_opened');
}

function addClassAddImage () {
  popupAddImage.classList.add('popup_opened');
}

//функция закрытия попапа
function removeClass () {
  popupEditProfile.classList.remove('popup_opened');
  popupAddImage.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    removeClass();
}

//событие открытия попапа редактирования профиля
popupEditOpenBtn.addEventListener ('click', addClassPopupEditProfile);

//событие открытия попапа добавления картинки
popupAddImageOpenBtn.addEventListener('click', addClassAddImage);

//Событие закрытия попапа
popupCloseBtnEditProfile.addEventListener('click', removeClass);
popupCloseBtnAddImage.addEventListener('click', removeClass);
// он будет следить за событием “submit” - «отправка»
formProfileEdit.addEventListener('submit', formSubmitHandler);
//закрытие попапа кликом на любую облать
// popup.addEventListener ('click', function (event) {
//   if (event.target == popupFlex) {
//     toggleClass();
//   }
// });
///////////////////////////////////////////////////Практическая работа № 5
//массив для заполнения страницы 6 фотографиями
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

const cardTemplate = document.querySelector('#cards').content;
const cardOnline = document.querySelector('.elements__grid');

let cardElement;

//заполнение сайта шестью карточками
initialCards.forEach(item => {
  //клонирование содержимое тега template
  cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  //заполнение template данными
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__text').textContent = item.name;
  
  //лайк
  cardElement.querySelector('.button_type_like').addEventListener ('click', event => {
  event.target.classList.toggle('button_type_like-active');
  });

  //добавление блока на сайт
  cardOnline.append(cardElement);
  
})

//Добавление картинки
const placeInput = document.querySelector ('.form__input_type_place');
const linkInput = document.querySelector ('.form__input_type_link');
const makeBtn = document.querySelector ('.button_type_make');

function AddImage (evt) {
  evt.preventDefault();
  cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = linkInput.value;
  cardElement.querySelector('.card__image').alt = placeInput.value;
  cardElement.querySelector('.card__text').textContent = placeInput.value;

  //лайк
  cardElement.querySelector('.button_type_like').addEventListener ('click', event => {
  event.target.classList.toggle('button_type_like-active');
  });

  //добавление блока на сайт
  cardOnline.prepend(cardElement);
  removeClass();
}

formAddImage.addEventListener('submit', AddImage);

//удаление картинки

const removeBtn = document.querySelector ('.button_type_remove');

const removeImage = evt => {
  evt.target.closest()
}






