let popup = document.querySelector ('.popup');
let popupOpenBtn = document.querySelector ('.button_type_edit');
let popupCloseBtn = document.querySelector ('.button_type_close');
let nameInput = document.querySelector ('.form_type_name');
let jobInput = document.querySelector ('.form_type_job');
let profileName = document.querySelector ('.profile__name');
let profileJob = document.querySelector ('.profile__job');
let formElement = document.querySelector('.form');

//функция открытия попапа
function addClass () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

//функция закрытия попапа
function removeClass () {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    removeClass();
}

//событие открытия попапа
popupOpenBtn.addEventListener ('click', addClass);

//Событие закрытия попапа
popupCloseBtn.addEventListener('click', removeClass);

// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

//закрытие попапа кликом на любую облать
// popup.addEventListener ('click', function (event) {
//   if (event.target == popupFlex) {
//     toggleClass();
//   }
// });


