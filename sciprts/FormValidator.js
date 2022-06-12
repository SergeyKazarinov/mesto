export class FormValidator {
  constructor(validConfig, formElement) {
    this._formSelector = validConfig.formSelector
    this._inputSelector = validConfig.inputSelector;
    this._submitButtonSelector = validConfig.submitButtonSelector;
    this._inactiveButtonClass = validConfig.inactiveButtonClass;
    this._inputErrorClass = validConfig.inputErrorClass;
    this._errorClass = validConfig.errorClass;
    this._formElement = formElement;
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
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  /** Метод добавления событий для всех форм */
  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', ()=> {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
      });
    });
  };

  deleteInputErros() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
    this._toggleButtonState();
  }

  /** Метод включение валидации форм */
  enableValidation() {
    this._formElement.addEventListener ('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListener();
  };
}
