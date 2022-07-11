/**
 * Класс Section - отвечает за отрисовку элементов на странице
 * @class
 * @property {object} Section._items                - Массив данных (карточек)
 * @property {function} Section._renderer           - Функция создания элемента
 * @property {string} Section._containerSelector    - CSS класс контейнера для вставки элементов
 * @property {HTMLElement} Section._container       - DOM-узел контейнера для вставки элементов
 */
export default class Section {
  /**
   * 
   * @param {property} items            - массив данных
   * @param {property} renderer         - функция создания элемента
   * @param {string} containerSelector  - CSS класс контейнера для вставки элементов
   */
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(`.${this._containerSelector}`);
  }

  /**
   * @method addItem        - Метод добавления элемента в DOM-узел
   * @param {'object'} item - объект массива данных
   */
  addItem(item) {
    this._container.prepend(this._renderer(item));
  }

  /**
   * @method rendererItem - метод перебора массива данных
   */
  renderItems() {
    this._items.forEach(item => {
      this.addItem(item);
    });
  }
}