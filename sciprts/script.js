/** модальные окна */
const popupImageZoom = document.querySelector ('.popup_type_image-zoom');
const popupEditProfile = document.querySelector ('.popup_type_edit-profile');
const popupAddImage = document.querySelector ('.popup_type_add-image');
/** кнопки */
const popupEditOpenBtn = document.querySelector ('.button_type_edit');
const popupAddImageOpenBtn = document.querySelector ('.button_type_add');
const popupCloseBtnEditProfile = popupEditProfile.querySelector ('.button_type_close');
const popupCloseBtnAddImage = popupAddImage.querySelector ('.button_type_close');
const popupCloseBtnImage = popupImageZoom.querySelector ('.button_type_close');
/** поля и формы */
const nameInput = document.querySelector ('.form__input_type_name');
const jobInput = document.querySelector ('.form__input_type_job');
const profileName = document.querySelector ('.profile__name');
const profileJob = document.querySelector ('.profile__job');
const formProfileEdit = document.querySelector('form[name=profile-edit');
const formAddImage = document.querySelector('form[name=add-image');
const placeInput = document.querySelector ('.form__input_type_place');
const linkInput = document.querySelector ('.form__input_type_link');
/** template и блок для вставки */
const cardTemplate = document.querySelector('#cards').content;
const newCard = document.querySelector('.elements__grid');
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

/** функция заполнения форм редактирования */
const fillForm = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/** функция открытия попапа */
const addClass = (event) => {
	event.classList.add('popup_opened');
}

/** функция закрытия попапа */
const removeClass = event => {
	event.classList.remove('popup_opened');
}

/** Удаление карточки */
const removeImage = evt => {
  evt.target.closest('.card').remove();
}

/** лайк */
const like = event => {
	event.target.classList.toggle('button_type_like-active');
}

/** открытие попап с картинкой */
const openPopupImage = event => {
	const image = popupImageZoom.querySelector('.popup__image');
	image.src = event.target.closest('.card__image').src;
	image.alt = event.target.closest('.card__image').alt;
	popupImageZoom.querySelector('.popup__text').textContent = event.target.closest('.card__image').alt;

	addClass(popupImageZoom);
}

/** функция заполяет карточки данными */
const createCard = (name, link) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardText = cardElement.querySelector('.card__text');

	cardImage.src = link;
	cardImage.alt = name;
	cardText.textContent = name;

	cardElement.querySelector('.button_type_like').addEventListener ('click', like); //лайк
	cardElement.querySelector('.button_type_remove').addEventListener('click', removeImage); //Удаление картинки
	cardElement.querySelector('.button_type_card').addEventListener('click', openPopupImage); //открытие картинки

	return cardElement;
}

/** функция добавления карточки в контейнер */
const renderCard = (wrap, name, link) => {
	wrap.append(createCard(name, link));
}

/** заполнение сайта шестью карточками */
initialCards.forEach((item) => {
  renderCard(newCard, item.name, item.link);
})

/** Добавление картинки */
const addCard = (wrap, name, link) => {
	wrap.prepend(createCard(name, link));
}

const addImage = evt => {
  evt.preventDefault();
	addCard(newCard, placeInput.value, linkInput.value);
	formAddImage.reset();
	removeClass(popupAddImage);
}

/** Обработчик «отправки» формы, хотя пока
она никуда отправляться не будет */
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    removeClass(popupEditProfile);
}

/** событие открытия попапа редактирования профиля */
popupEditOpenBtn.addEventListener ('click', () => {
	fillForm();
	addClass(popupEditProfile);
});

/** событие открытия попапа добавления картинки */
popupAddImageOpenBtn.addEventListener('click', () => {
	addClass(popupAddImage);
});

/** События закрытия попапа */
popupCloseBtnEditProfile.addEventListener('click', () => {
	removeClass(popupEditProfile);
});
popupCloseBtnAddImage.addEventListener('click', () => {
	removeClass(popupAddImage);
});
popupCloseBtnImage.addEventListener('click', () => {
	removeClass(popupImageZoom);
});
/** событие отправки формы с именем */
formProfileEdit.addEventListener('submit', formEditProfileSubmitHandler);

/** событие добавление картинки на сайт */
formAddImage.addEventListener('submit', addImage);