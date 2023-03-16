import icons from 'url:../../img/icons.svg'; //type (url:path)for any data except programming files

export default class View {
  _data;
  
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   *@returns {undefined| string} A markup string is returned if no data
   *@this {Object} View instance
   */
  render(data) {
    if (!data || data.length === 0) return this.renderError();

    this._data = data; //the recipe
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const currEl = currentElements[i];

      //UPDATE ATTRIBUTES
      if (!currEl.isEqualNode(newEl))
        Array.from(newEl.attributes).forEach(attr => {
          currEl.setAttribute(attr.name, attr.value);
        });

      //UPDATE CHANGED TEXT
      if (
        !currEl.isEqualNode(newEl) &&
        newEl.firstChild?.nodeValue.trim('') !== ''
      ) {
        return (currEl.textContent = newEl.textContent);
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //render error message
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //render SUCCESS message
  renderMessage(message = this._Message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

}
