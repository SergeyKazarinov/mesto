import '../pages/index.css';

import Section from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Api } from '../components/Api.js';
import {popupEditOpenBtn,
  popupAddImageOpenBtn,
  cardSelector,
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
  avatarPopupSelector,
  avatarFormName,
  popupAvatarOpenBtn,
  deletePopupSelector,
} from "../utils/constants.js";
import Popup from '../components/Popup';

Array.from(document.forms).forEach(formElement => {
  formValidators[formElement.name] = new FormValidator(validConfig, formElement);
  formValidators[formElement.name].enableValidation();
});

const viewPopup = new PopupWithImage(
  imagePopupSelector,
  popupConfiguration,
  viewPopupConfiguration
  );
viewPopup.setEventListeners();

const deletePopup = new Popup(
  deletePopupSelector,
  popupConfiguration
);
deletePopup.setEventListeners();

const openDeletePopup = () => {
  const deleteButtonSubmit = document.querySelector('#button-delete');
  deleteButtonSubmit.addEventListener('click', () => {
    deletePopup.close();
  });
  deletePopup.open();
}

const createCard = (item) => {
  const card = new Card(
    {item},
    cardSelector,
    viewPopup.open.bind(viewPopup),
    openDeletePopup
    );
  return card.generateCard();
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'c902ae4a-b71e-4191-acb5-95e4c86f4c9b',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then(result => {
    const cardsContainer = new Section({
      items: result.reverse(),
      renderer: createCard,
    }, cardsContainerSelector);

cardsContainer.renderItems();
  });

api.getUserInfo()
.then(result => {
  user.setUserInfo({title: result.name, job: result.about, avatar: result.avatar});
  user.setUserAvatar({avatar: result.avatar});
});

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

const handleAvatarSubmit = (item) => {
  const avatar = document.querySelector('.profile__avatar');
  avatar.setAttribute('src', item);
}

const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  avatarFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[avatarFormName].deleteInputError,
  handleAvatarSubmit
)
avatarPopup.setEventListeners();
const handleAvatarPopupOpen = () => {
  avatarPopup.open();
}


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

popupAvatarOpenBtn.addEventListener('click', handleAvatarPopupOpen)