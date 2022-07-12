import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor (popupSelector, formName, popupConfig, {inputSelector, submitBtnSelector, formSelector}, errorsResetCallBack, submitCallBack, buttonName, getterCallBack = null) {
    super(popupSelector, popupConfig);
    this._formName = formName;
    this._inputSelector = inputSelector;
    this._submitBtnSelector = submitBtnSelector;
    this._formSelector = formSelector;
    this._errorsResetCallBack = errorsResetCallBack;
    this._submitCallBack = submitCallBack;
    this._buttonName = buttonName;
    this._getterCallBack = getterCallBack;
    this._formElement = document.forms[this._formName];
    this._inputs = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
    this._submitBtn = this._formElement.querySelector(`.${this._submitBtnSelector}`);
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((inputElement) => {
      values[inputElement.id.slice(6)] = inputElement.value;
    })
    return values;
  }

  _setInputValues(values) {
    console.log(values)
    this._inputs.forEach((inputElement) => {
      inputElement.value = values[inputElement.id.slice(6)];
    })
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitBtn.textContent = 'Сохранение...';
    this._submitBtn.disabled = true;
    this._submitCallBack(this._getInputValues(), this);
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  setSubmitBtnName = () => {
    this._submitBtn.textContent = this._buttonName;
  }

  open = () => {
    if(this._getterCallBack) {
      this._setInputValues(this._getterCallBack());
    }

    this._errorsResetCallBack();
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}