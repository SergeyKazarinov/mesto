let popupOpenBtn = document.querySelector ('.edit-button');
let popup = document.querySelector ('.popup');
let PopupCloseBtn = document.querySelector ('.popup__close');
let popupFlex = document.querySelector ('.popup__flex');
let popupSaveBtn = document.querySelector ('.popup__save');
let profileName = document.querySelector ('.profile__name');
let profileJob = document.querySelector ('.profile__job');
let popupName = document.querySelector ('.popup__name');
let popupJob = document.querySelector ('.popup__job');

popupName.value = profileName.textContent;
popupJob.value = profileJob.textContent;

function toggleClass () {
  popup.classList.toggle('popup__opened');
}

popupOpenBtn.addEventListener ('click', function () {
  toggleClass();
});

popup.addEventListener ('click', function (event) {
  if (event.target == popupFlex) {
    toggleClass();
  }
});

// PopupCloseBtn.addEventListener('keydown', function () {
//   toggleClass();
// });

PopupCloseBtn.addEventListener('click', function () {
  toggleClass();
});


popupSaveBtn.addEventListener ('click', function (evt){
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  toggleClass();
})


