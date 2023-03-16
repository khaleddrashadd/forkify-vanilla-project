import icons from 'url:../../img/icons.svg'; //type (url:path)for any data except programming files
import PreView from './previewView';

class ResultsView extends PreView {
  _parentElement = document.querySelector('.results');

  _errorMessage = 'No recipes found for your query. Please try again!';
  _Message = '';

}
export default new ResultsView();
