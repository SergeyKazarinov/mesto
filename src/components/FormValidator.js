export class FormValidator {
  constructor(validConfig, formElement) {
    this._formSelector = validConfig.formSelector
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._inactiveButtonClass = validConfig.inactiveButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
    this._formElement = formElement;
    this._buttonSubmit = formElement.querySelector(validConfig.submitButtonSelector);
  }

  /** Метод отображения ошибки валидации и подчеркивания */
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  /** Метод удаления ошибки валидации и подчеркивания */
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  /** Метод проверки форм на валидность */
  _checkInputValidity (inputElement) {
    const message = inputElement.validationMessage;
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, message);
    }
    else {
      this._hideInputError(inputElement);
    }
  };

  /** Метод возврата значения валидности input'ов */
  _hasInvalidInput () {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };


  /** Метод настройки кнопки submit */
  _toggleButtonState () {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  };

  /** Метод добавления событий для всех форм */
  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', ()=> {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
      });
    });
  };
  
  /** Метод делает кнопку отправки формы активной */
  activeSubmitButton() {
    this._buttonSubmit.disabled = false;
    this._buttonSubmit.classList.remove(this._inactiveButtonClass);
  };
  
  /** Метод делает кнопку отправки формы не активной */
  inactiveSubmitButton() {
    this._buttonSubmit.disabled = true;
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  };

  /**Метод очищает сообщение об ошибке и стилизацию инпутов */
  deleteInputError = () => {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState();
  };

  /** Метод включение валидации форм */
  enableValidation = () => {
    this._setEventListener();
  };
}
