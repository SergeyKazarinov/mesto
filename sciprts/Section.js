export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._renderItems = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  addItem(element) {
    this._containerSelector.append(element)
  }
  renderer() {
    this._renderItems.forEach(item => {
      this._renderer(item);
    });
  }
}