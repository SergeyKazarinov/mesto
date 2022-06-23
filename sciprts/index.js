import Section from "./Section.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {popupList,
  popupEditProfile,
  popupAddImage,
  popupImageZoom,
  popupImage,
  popupText,
  popupEditOpenBtn,
  popupAddImageOpenBtn,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  formProfileEdit,
  formAddImage,
  placeInput,
  linkInput,
  newCard,
  cardSelector,
  initialCards,
  validConfig,
  formValidators
} from "./constants.js";

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
  if(event.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

const createCard = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({item}, cardSelector, openPopupImage);
    const cardElement = card.generateCard();
    createCard.addItem(cardElement);
  }
}, newCard)

const addCardSubmitHandler = evt => {
  evt.preventDefault();
  
  const addCard = new Section ({
    items: [{name: placeInput.value, link: linkInput.value}],
    renderer: (item) => {
      const card = new Card({item}, cardSelector, openPopupImage);
      const cardElement = card.generateCard();
      addCard.addItem(cardElement);
    }
  }, newCard);

  addCard.renderer();

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

createCard.renderer();