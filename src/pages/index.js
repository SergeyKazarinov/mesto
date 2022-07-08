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

/**
 * Перебор всех форм
 */
Array.from(document.forms).forEach(formElement => {
  /**
   * создание класса валидации
   */
  formValidators[formElement.name] = new FormValidator(validConfig, formElement);
  /**
   * вызов метода валидации формы
   */
  formValidators[formElement.name].enableValidation();
});

/**
 * @function createCard - функция создания карточки
 * @param {object} item - массив карточек
 * @returns             - возвращает готовую карточку
 */
const createCard = (item) => {
  /**
   * экземпляр класса для создания карточки
   * @constanta
   * @type {class} Card
   */
  const card = new Card(
    {item},
    cardSelector,
    viewPopup.open.bind(viewPopup),
    openDeletePopup
    );
  return card.generateCard();
};

/**
 * @function handleProfileFormSubmit - функция отправки формы данных пользователя и установки новых данных на страницу
 * @param {object} data              - объект данных о пользователе
 *  @property {string} data.title          - Имя пользователя
 *  @property {string} data.job            - информация о пользователе
 */
const handleProfileFormSubmit = (data) => {
  api.patchUserInfo(data);
  user.setUserInfo(data);
};

/**
 * @function handleAvatarSubmit - функция отправки аватарки на сервер и установки аватарки на сайт
 * @param {object} data         - объект, содержащий ссылку на картинку
 *  @property {string} data.avatar    - ссылка на картинку
 */

const handleAvatarSubmit = (data) => {
  api.patchAvatarInfo(data);
  user.setUserAvatar({avatar: data.avatar});
};

/**
 * @function handleCardSubmit - функция добавления новой карточки на сайт
 * @param {object} item       - данные карточки
 */

/**
 * экземпляр класса для подключения к серверу
 * @constanta
 * @type {class} Api
 * @property {stirng} baseUrl        - адресс сервера
 * @property {object} headers        - заголовок
 *  @property {string} authorization - токен для авторизации
 */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'c902ae4a-b71e-4191-acb5-95e4c86f4c9b',
    'Content-Type': 'application/json'
  }
});

const handleCardSubmit = (data) => {
  api.addNewCard(data)
  .then(result => {
    /**
     * экземпляр класса для вставки готовой карточки
     * @constanta
     * @type {class} Section
     */
    const cardsContainer = new Section({
      items: result,
      renderer: createCard,
    }, cardsContainerSelector
    );
    
    cardsContainer.addItem(result);
  });
};

/**
 * создание экземпляра класса UserInfo для получения данных о пользователе
 * @constatn
 * @type {class} UserInfo
 */
const user = new UserInfo(profileConfiguration);

/**
 * экземпляр класса для попапа редактирования профиля
 * @constanta
 * @type {class} PopupWithForm
 */
const profilePopup = new PopupWithForm(
  profilePopupSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].deleteInputError,
  handleProfileFormSubmit,
  user.getUserInfo,
);

/**
 * экземпляр класса для смены аватара
 * @constanta
 * @type {class} PopupWithForm
 */
const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  avatarFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[avatarFormName].deleteInputError,
  handleAvatarSubmit
);

/**
 * экземпляр класса для попапа добавления картинки
 * @constanta
 * @type {class} PopupWithForm
 */
const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newPlaceFormName].deleteInputError,
  handleCardSubmit,
);

/**
 * создание экземпляра класса PopupWithForm для попапа картинки
 * @constant
 * @type {class} PopupWithImage
 */
const viewPopup = new PopupWithImage(
  imagePopupSelector,
  popupConfiguration,
  viewPopupConfiguration
);

/**
 * создание экземпляра класса для попапа удаления картинки
 * @constanta
 * @type {class} Popup
 */
const deletePopup = new Popup(
    deletePopupSelector,
    popupConfiguration
);

/**
 * вызов метода загрузки информации о пользователе
 */
api.getUserInfo()
.then(result => {
  user.setUserInfo({title: result.name, job: result.about});
  user.setUserAvatar({avatar: result.avatar});
});

/**
 * вызов метода загрузки карточек с сервера
 */
api.getInitialCards()
  .then(result => {
    /**
     * экземпляр класса для вставки готовой карточки
     * @constanta
     * @type {class} Section
     */
    const cardsContainer = new Section({
      items: result.reverse(),
      renderer: createCard,
    }, cardsContainerSelector
    );
    
    cardsContainer.renderItems();
  });

/**
 * @method setEventListeners - Установка слушателей на попап
 */
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
newCardPopup.setEventListeners();
viewPopup.setEventListeners();
deletePopup.setEventListeners();

/**
 * @function openDeletePopup - функция открытия попапа удаления карточки ПЕРЕДЕЛАТЬ
 */
const openDeletePopup = () => {
  const deleteButtonSubmit = document.querySelector('#button-delete');
  deleteButtonSubmit.addEventListener('click', () => {
    deletePopup.close();
  });
  deletePopup.open();
}

/**
 * @function handleProfilePopupOpen - функция открытия попапа редактирования профиля
 */
const handleProfilePopupOpen = () => {
  profilePopup.open();
};

/**
 * @function handleAvatarPopupOpen - функция открытия попапа смены аватара
 */
const handleAvatarPopupOpen = () => {
  avatarPopup.open();
}

/**
 * @function handleAddCardPopupOpen - функция открытия попапа добавления картинки
 */
const handleAddCardPopupOpen = () => {
  newCardPopup.open();
};

/**
 * @listens click - слушатель кнопки открытия попапа редактирования профиля
 */
popupEditOpenBtn.addEventListener('click', handleProfilePopupOpen);

/**
 * @listens click - слушатель кнопки открытия попапа редактирования аватарки
 */
popupAvatarOpenBtn.addEventListener('click', handleAvatarPopupOpen);

/**
 * @listens click - слушатель кнопки открытия попапа добавления картинки
 */
popupAddImageOpenBtn.addEventListener('click', handleAddCardPopupOpen);