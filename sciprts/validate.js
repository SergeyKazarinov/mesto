/** Объект настроек */
const validConfig = {
  formSelector: 'form',
  inputSelector: 'form__input',
  submitButtonSelector: 'button_type_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}; 

/** Функция отображения ошибки валидации и подчеркивания */
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

/** Функция удаления ошибки валидации и подчеркивания */
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

/** Функция проверки форм на валидность */
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const message = inputElement.validationMessage;
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, message, inputErrorClass, errorClass);
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

/** Функция возврата значения валидности input'ов */
const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

/** Функция деактивации кнопки */
const inactiveButton = () => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

/** Функция настройки кнопки submit */
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

/** Функция делает кнопку отправки формы не активной */
const inactiveSubmitButton = (buttonSave) => {
  buttonSave.disabled = true;
  buttonSave.classList.add('button_inactive');
}

/** Функция делает кнопку отправки формы активной */
const activeSubmitButton = (buttonSave) => {
  buttonSave.disabled = false;
  buttonSave.classList.remove('button_inactive');
}

/** Функция добавления событий для всех форм */
const setEventListener = (formElement, valid) => {
  const {inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass} = valid;
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (ev)=> {
    checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

/** Функция включение валидации форм */
const enableValidation = (validConfig) => {
  const {formSelector} = validConfig;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener ('submit', evt => {
      evt.preventDefault();
    });
    setEventListener(formElement, validConfig);
  })
};

/** Вызов функции для всех форм */
enableValidation(validConfig);