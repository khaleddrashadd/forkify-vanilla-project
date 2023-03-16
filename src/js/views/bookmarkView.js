import icons from 'url:../../img/icons.svg'; //type (url:path)for any data except programming files
import PreView from './previewView';

class BookmarkView extends PreView {
  _parentElement = document.querySelector('.bookmarks__list');

  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
}
export default new BookmarkView();


