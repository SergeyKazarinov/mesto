class PopupWithForm extends PopupWithForm {
  constructor (cardSelector, submitForm) {
    super(cardSelector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    // this._inputList = Array.from(this._submitForm.querySelectorAll('.form__input'));
    // this._inputList.forEach(inputElement => {

    // })
  }

  setEventListeners() {

  }

  close() {
    this._submitForm.reset();
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
  }
}t