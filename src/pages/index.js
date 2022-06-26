import '../pages/index.css';

import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import {popupEditOpenBtn,
  popupAddImageOpenBtn,
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
} from "../components/constants.js";

Array.from(document.forms).forEach(formElement => {
  formValidators[formElement.name] = new FormValidator(validConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

const viewPopup = new PopupWithImage(imagePopupSelector, popupConfiguration, viewPopupConfiguration);
viewPopup.setEventListeners();

const createCard = (item) => {
  const card = new Card({item}, cardSelector, viewPopup.open.bind(viewPopup));
  return card.generateCard();
}

const cardsContainer = new Section({
  items: initialCards.reverse(),
  renderer: createCard,
}, cardsContainerSelector);

cardsContainer.renderAll();

const handleCardSubmit = (item) => {
  cardsContainer.addItem(item);
};

const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newPlaceFormName].deleteInputError,
  handleCardSubmit,
  );
newCardPopup.setEventListeners();

const addCardSubmitHandler = () => {
  newCardPopup.open();
};

/** Обработчик «отправки» формы*/
function handleProfileFormSubmit (data) {
  user.setUserInfo(data);
};

const user = new UserInfo(profileConfiguration);

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
  profilePopup.open();
};

/** событие открытия попапа редактирования профиля */
popupEditOpenBtn.addEventListener ('click', handleProfilePopupOpen);

popupAddImageOpenBtn.addEventListener('click', addCardSubmitHandler);