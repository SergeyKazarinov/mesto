/** модальные окна */
export const popupList = Array.from(document.querySelectorAll('.popup'));
export const popupEditProfile = document.querySelector ('.popup_type_edit-profile');
export const popupAddImage = document.querySelector ('.popup_type_add-image');
export const popupImageZoom = document.querySelector ('.popup_type_image-zoom');
export const popupImage = popupImageZoom.querySelector('.popup__image');
export const popupText = popupImageZoom.querySelector('.popup__text');
/** кнопки */
export const popupEditOpenBtn = document.querySelector ('.button_type_edit');
export const popupAddImageOpenBtn = document.querySelector ('.button_type_add');
/** поля и формы */
export const nameInput = document.querySelector ('.form__input_type_name');
export const jobInput = document.querySelector ('.form__input_type_job');
export const profileName = document.querySelector ('.profile__name');
export const profileJob = document.querySelector ('.profile__job');
export const formProfileEdit = document.querySelector('form[name=profile-edit');
export const formAddImage = document.querySelector('form[name=add-image');
export const placeInput = document.querySelector ('.form__input_type_place');
export const linkInput = document.querySelector ('.form__input_type_link');

/** template и блок для вставки */
export const newCard = document.querySelector('.elements__grid');
export const cardSelector = document.getElementById('cards').content.querySelector('.card');

/** массив для заполнения страницы 6 фотографиями */
export const initialCards = [
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
export const validConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const formValidators = {};

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