/**кнопки
 * @const popupEditOpenBtn - кнопка открытия попапа редактирования профиля
 */
export const popupEditOpenBtn = document.querySelector ('.button_type_edit');

/**
 * @const popupAvatarOpenBtn - кнопка открытия попапа смены аватара
 */
export const popupAvatarOpenBtn = document.querySelector('.button_type_avatar');
/**
 * @const popupAddImageOpenBtn - кнопка открытия попапа добавления картинки
 */
export const popupAddImageOpenBtn = document.querySelector ('.button_type_add');

/**
 * @const cardSelector - селектор карточки
 */
export const cardSelector = document.getElementById('cards').content.querySelector('.card');

/** Валидация */
export const validConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const formValidators = {};

/**
 * @object
 * @property {string} inputSelector - класс инпутов
 * @property {string} submitBtnSelector - класс кнопки отправки формы
 * @property {string} formSelector - класс формы
 */
export const formConfiguration = {
  inputSelector: 'form__input',
  submitBtnSelector: 'button_type_save',
  formSelector: 'form',
}

export const popupConfiguration = {
  activeModifier: 'popup_opened',
  closeBtnSelector: 'button_type_close',
}

export const profileConfiguration = {
  titleSelector: 'profile__name', 
  jobSelector: 'profile__job',
  avatarSelector: 'profile__avatar',
}

export const viewPopupConfiguration = {
  imageSelector: 'popup__image',
  captionSelector: 'popup__text',
}

export const cardsContainerSelector = 'elements__grid';
export const newPlacePopupSelector = 'popup_type_add-image';
export const profilePopupSelector = 'popup_type_edit-profile';
export const imagePopupSelector = 'popup_type_image-zoom';
export const newPlaceFormName = 'add-image';
export const profileFormName = 'profile-edit';
export const avatarPopupSelector = 'popup_type_avatar';
export const avatarFormName = 'avatar';
export const deletePopupSelector = 'popup_type_delete';
export const confirmationButtonSelector = 'button_type_delete';
export const myId = '1f938e0ac95d82203f13dc8c';