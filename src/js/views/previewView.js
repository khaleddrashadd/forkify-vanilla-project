import icons from 'url:../../img/icons.svg'; //type (url:path)for any data except programming files
import View from './view';

export default class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(results => {
      const id = window.location.hash.slice(1);
      return `
    <li class="preview">
      <a class="preview__link ${
        id === results.id ? 'preview__link--active' : ''
      }" href="#${results.id}">
        <figure class="preview__fig">
          <img src="${results.image}" alt="${results.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">
            ${results.title}
          </h4>
          <p class="preview__publisher">${results.publisher}</p>
          <div class="preview__user-generated ${results.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
            `;
    });
  }
  
}
