import Section from "./Section.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Popup from "./Popup.js";
import { PopupWithForm } from "./PopupWithForm.js";

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
  formValidators,
  formConfiguration,
  popupConfiguration,
  cardsContainerSelector,
  newPlacePopupSelector,
  newPlaceFormName,
  profileFormName,
  profileConfiguration,
  profilePopupSelector,
  viewPopupConfiguration,
  imagePopupSelector,
} from "./constants.js";
import { UserInfo } from "./UserInfo.js";
import { PopupWithImage } from "./PopupWithImage.js";

Array.from(document.forms).forEach(formElement => {
  formValidators[formElement.name] = new FormValidator(validConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

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
    popupOpened.closes();
  }
}

const viewPopup = new PopupWithImage(imagePopupSelector, popupConfiguration, viewPopupConfiguration);


const createCard = (item) => {
  const card = new Card({item}, cardSelector, viewPopup.open.bind(viewPopup));
  return card.generateCard();
}

const cardsContainer = new Section({
  items: initialCards.reverse(),
  renderer: createCard,
}, cardsContainerSelector);

cardsContainer.rendererAll();

const handleCardSubmit = (item) => {
  cardsContainer.addItem(item);
}
const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newPlaceFormName].deleteInputError,
  handleCardSubmit,
  );
newCardPopup.setEventListeners();

const user = new UserInfo(profileConfiguration);


const addCardSubmitHandler = () => {
  console.log('click');
  console.dir(newCardPopup);
  newCardPopup.open();

}

/** Обработчик «отправки» формы*/
function handleProfileFormSubmit (data) {
  user.setUserInfo(data);
}

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].deleteInputError,
  handleProfileFormSubmit,
  user.getUserInfo,
  );
profilePopup.setEventListeners();

const handleProfilePopupOpen = () => {
  console.log('click');
  profilePopup.open();
}

/** событие открытия попапа редактирования профиля */
popupEditOpenBtn.addEventListener ('click', handleProfilePopupOpen);

popupAddImageOpenBtn.addEventListener('click', addCardSubmitHandler);