import { Card } from "./card.js";
import { FormValidator } from "./FormValidator.js";

/** модальные окна */
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupEditProfile = document.querySelector ('.popup_type_edit-profile');
const popupAddImage = document.querySelector ('.popup_type_add-image');
const popupImageZoom = document.querySelector ('.popup_type_image-zoom');
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
/** Валидация */
const validConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const popupEditProfileValidator = new FormValidator(validConfig, popupEditProfile);
popupEditProfileValidator.enableValidation();

const popupAddImageValidator = new FormValidator(validConfig, popupAddImage);
popupAddImageValidator.enableValidation();


/** функция заполнения форм редактирования */
const fillForm = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/** функция открытия попапа */
export const openPopup = popup => {
	popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

/** открытие попап с картинкой */
export const openPopupImage = (linkImage, altImage) => {
	popupImageZoom.querySelector('.popup__image').src = linkImage;
	popupImageZoom.querySelector('.popup__image').alt = altImage;
	popupImageZoom.querySelector('.popup__text').textContent = altImage;

	openPopup(popupImageZoom);
}

/** функция закрытия попапа */
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  popupEditProfileValidator.deleteInputErros();
  popupAddImageValidator.deleteInputErros();
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

const addCardSubmitHandler = evt => {
  evt.preventDefault();
  const card = new Card(placeInput.value, linkInput.value, newCard);
  const cardElement = card.generateCard();

  newCard.prepend(cardElement);
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
  activeSubmitButton(submitBtnSaveEditProfile);//функция находится в validation.js
	openPopup(popupEditProfile);
});

/** событие открытия попапа добавления картинки */
popupAddImageOpenBtn.addEventListener('click', () => {
  formAddImage.reset();
  inactiveSubmitButton(submitBtnSaveAddImage);//функция находится validation.js
	openPopup(popupAddImage);
});

/** событие отправки формы с именем */
formProfileEdit.addEventListener('submit', formEditProfileSubmitHandler);

/** событие отправки формы добавления картинки на сайт */
formAddImage.addEventListener('submit', addCardSubmitHandler);


initialCards.forEach(item => {
  const card = new Card(item.name, item.link, newCard);
  const cardElement = card.generateCard();

  newCard.append(cardElement);
});