import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

/** модальные окна */
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector ('.popup_type_edit-profile');
const popupAddImage = document.querySelector ('.popup_type_add-image');
const popupImageZoom = document.querySelector ('.popup_type_image-zoom');
const popupImage = popupImageZoom.querySelector('.popup__image');
const popupText = popupImageZoom.querySelector('.popup__text');
/** кнопки */
const popupEditOpenBtn = document.querySelector ('.button_type_edit');
const popupAddImageOpenBtn = document.querySelector ('.button_type_add');
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
const newCard = document.querySelector('.elements__grid');
const cardSelector = document.getElementById('cards').content.querySelector('.card');

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
/** Валидация */
const validConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const formValidators = {};

Array.from(document.forms).forEach(formElement => {
  formValidators[formElement.name] = new FormValidator(validConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

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

/** открытие попап с картинкой */
const openPopupImage = (linkImage, altImage) => {
	popupImage.src = linkImage;
	popupImage.alt = altImage;
	popupText.textContent = altImage;

	openPopup(popupImageZoom);
}

/** функция закрытия попапа */
const closePopup = popup => {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', closePopupEsc);
}

/** функция закрытия попапа при клике на любую область */
const closePopupOverlay = () => {
  popupList.forEach(popupElement => {
    popupElement.addEventListener('mousedown', event => {
      if(
        event.target.classList.contains('popup') ||
        event.target.closest('.button_type_close')
        ) {
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

/**Функция создания карточки */
const createCard = (name, link, cardSelector, openPopupImage) => {
  const card = new Card(name, link, cardSelector, openPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
}

const addCardSubmitHandler = evt => {
  evt.preventDefault();

  newCard.prepend(createCard(placeInput.value, linkInput.value, cardSelector, openPopupImage));
	formAddImage.reset();
	closePopup(popupAddImage);
}

/** Обработчик «отправки» формы*/
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

/** событие открытия попапа редактирования профиля */
popupEditOpenBtn.addEventListener ('click', () => {
	fillForm();
  formValidators[formProfileEdit.name].activeSubmitButton();
  formValidators[formProfileEdit.name].deleteInputError();
	openPopup(popupEditProfile);
});

/** событие открытия попапа добавления картинки */
popupAddImageOpenBtn.addEventListener('click', () => {
  formAddImage.reset();
  formValidators[formAddImage.name].inactiveSubmitButton();
  formValidators[formAddImage.name].deleteInputError();
	openPopup(popupAddImage);
});

/** событие отправки формы с именем */
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);

/** событие отправки формы добавления картинки на сайт */
formAddImage.addEventListener('submit', addCardSubmitHandler);


initialCards.forEach(item => {
  newCard.append(createCard(item.name, item.link, cardSelector, openPopupImage));
});