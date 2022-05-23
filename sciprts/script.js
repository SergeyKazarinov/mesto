/** модальные окна */
const popupContainer = document.querySelector ('.popup');
const popupImageZoom = document.querySelector ('.popup_type_image-zoom');
const popupEditProfile = document.querySelector ('.popup_type_edit-profile');
const popupAddImage = document.querySelector ('.popup_type_add-image');
/** кнопки */
const popupEditOpenBtn = document.querySelector ('.button_type_edit');
const popupAddImageOpenBtn = document.querySelector ('.button_type_add');
const submitBtnSaveAddImage = popupAddImage.querySelector('.button_type_save');
const submitBtnSaveEditProfile = popupEditProfile.querySelector('.button_type_save');
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
const openPopup = popup => {
	popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

/** функция закрытия попапа */
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

/** функция закрытия попапа при клике на любую область */
const closePopupOverlay = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));

  popupList.forEach(popupElement => {
    popupElement.addEventListener('mousedown', event => {
      if((!event.target.closest('.popup__container') && !event.target.closest('.popup__container-image')) || event.target.closest('.button_type_close')) {
        closePopup(popupElement);
      }
    });
  });
}

/** Вызов функции закрытия попапа */
closePopupOverlay();

/** функция закрытия попапа по нажатию esc */
const closePopupEsc = event => {
  const popupOpened = document.querySelector('.popup_opened');
  if(event.key === "Escape") {
    closePopup(popupOpened);
  }
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

	openPopup(popupImageZoom);
}

/** функция заполяет карточки данными */
const createCard = (cardData) => {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardText = cardElement.querySelector('.card__text');

	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardText.textContent = cardData.name;

	cardElement.querySelector('.button_type_like').addEventListener ('click', like); //лайк
	cardElement.querySelector('.button_type_remove').addEventListener('click', removeImage); //Удаление картинки
	cardElement.querySelector('.button_type_card').addEventListener('click', openPopupImage); //открытие картинки

	return cardElement;
}

/** функция добавления карточки в контейнер */
const renderCardAppend = (wrap, name, link) => {
	wrap.append(createCard({name, link}));
}

/** заполнение сайта шестью карточками */
initialCards.forEach((item) => {
  renderCardAppend(newCard, item.name, item.link);
})

/** Добавление картинки */
const renderCardPrepend = (wrap, name, link) => {
	wrap.prepend(createCard({name, link}));
}

const addCardSubmitHandler = evt => {
  evt.preventDefault();
	renderCardPrepend(newCard, placeInput.value, linkInput.value);
	formAddImage.reset();
	closePopup(popupAddImage);
}
/** Функция делает кнопку отправки формы не активной */
const inactiveSubmitButton = (buttonSave) => {
  buttonSave.disabled = true;
  buttonSave.classList.add('button_inactive');
}

/** Функция делает кнопку отправки формы активной */
const activeSubmitButton = (buttonSave) => {
  buttonSave.disabled = false;
  buttonSave.classList.remove('button_inactive');
}

/** Обработчик «отправки» формы*/
function formEditProfileSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup(popupEditProfile);
}

/** событие открытия попапа редактирования профиля */
popupEditOpenBtn.addEventListener ('click', () => {
	fillForm();
  activeSubmitButton(submitBtnSaveEditProfile);
	openPopup(popupEditProfile);
});

/** событие открытия попапа добавления картинки */
popupAddImageOpenBtn.addEventListener('click', () => {
  formAddImage.reset();
  inactiveSubmitButton(submitBtnSaveAddImage);
	openPopup(popupAddImage);
});

/** событие отправки формы с именем */
formProfileEdit.addEventListener('submit', formEditProfileSubmitHandler);

/** событие отправки формы добавления картинки на сайт */
formAddImage.addEventListener('submit', addCardSubmitHandler);