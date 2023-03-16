import View from './view';
import icons from 'url:../../img/icons.svg'; //type (url:path)for any data except programming files

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //if page 1 and there are more results
    if (currentPage === 1 && numPages > 1) {
      return `
    <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    <button class="btn--inline pagination__btn--middle" disabled>
      <span>Page ${currentPage} / ${numPages}</span>
    </button>
      `;
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--middle" disabled>
        <span>Page ${currentPage} / ${numPages}</span>
      </button>
        `;
    }
    //intermediate pages
    if (currentPage < numPages) {
      return `
      <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
      <button class="btn--inline pagination__btn--middle" disabled>
        <span>Page ${currentPage} / ${numPages}</span>
      </button>
      <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
          `;
    }
    //if page 1 and no more results to render
    return;
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn || e.target.closest('.pagination__btn--middle')) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
let a = document.querySelector('*').classList.contains;
