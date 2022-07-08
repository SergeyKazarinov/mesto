/**
 * Базовый класс попапа
 * @class
 * @property {string} Popup._popupSelector    - CSS-класс попапа
 * @property {string} Popup._activeModifier   - CSS-класс открытого попапа
 * @property {string} Popup._closeBtnSelector - CSS-класс кнопки закрытия попапа
 * @property {HTMLElement} Popup._popup       - DOM-узел попапа
 * @property {HTMLElement} Popup._closeBtn    - DOM-узел кнопки закрытия попапа
 */
export default class Popup {
  /**
   * @constructor
   * @param {string} popupSelector                - название класса для поиска попапа
   * @param {object} popupConfig                  - объект с селекторами попапа
   * @param {string} popupConfig.activeModifier   - класс открытия попапа
   * @param {string} popupConfig.closeBtnSelector - класс кнопки закрытия попапа
   * @returns {Popup}
   */
  constructor (popupSelector, popupConfig) {
    this._popupSelector = popupSelector;
    this._activeModifier = popupConfig.activeModifier;
    this._closeBtnSelector = popupConfig.closeBtnSelector;
    this._popup = document.querySelector(`.${this._popupSelector}`);
    this._closeBtn = this._popup.querySelector(`.${this._closeBtnSelector}`);
  }

  /**
   * Метод закрытия попапа по клавише ESC
   * @param {event} event - событие нажатия клавиши
   */
  _handleEscClose = (event) => {
    if(event.key === "Escape") {
      this.close();
    }
  }

  /**
   * Метод закрытия попапа по клавише Х
   */
  _handleCLoseBtnClick = () => {
    this.close();
  }

  /**
   * Метод закрытия попапа по overlay
   * @param {event} ev 
   */
  _handleCLoseOverlayClick = (ev) => {
    if(ev.target === ev.currentTarget) {
      this.close();
    }
  }

  /**
   * Метод установки слушателей на кнопку закрытия попапа и overlay
   */
  setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleCLoseOverlayClick);
    this._closeBtn.addEventListener('click', this._handleCLoseBtnClick);
  }

  /**
   * Метод открытия попапа и добавления события нажатия клавиши
   */
  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._activeModifier);
  }

  /**
   * метод закрытия попапа и удаления события нажатия клавиши
   */
  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._activeModifier);
  }
}