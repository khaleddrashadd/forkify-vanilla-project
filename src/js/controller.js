import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';
//with PARCEL we can import anything like image folder to display the correct path
import 'core-js/stable';
import 'regenerator-runtime';

//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = location.hash.slice(1);
    if (!id) return;
    
    recipeView.renderSpinner();
    
    resultsView.update(model.getSearchResultPage());
    
    bookmarkView.render(model.state.bookmarks);
    //loading recipes
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //rendering recipes
    recipeView.render(recipe);
    
  } catch (error) {
    recipeView.renderError();
    //  alert(err);
  }
};

const controlSearchResults = async function () {
  try {
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    
    //Load search results
    await model.loadSearchResults(query);
    
    //Render search results
    resultsView.render(model.getSearchResultPage()); //DEFAULT THE FIRST PAGE
    
    //render pagination btn
    paginationView.render(model.state.search);
    
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  //Render search results
  resultsView.render(model.getSearchResultPage(goToPage));
  //render pagination btn
  paginationView.render(model.state.search);
};

const controlServings = function (newservings) {
  model.updateServings(newservings);
  
  // recipeView.render(model.state.recipe); // leads to render the entire DOM
  recipeView.update(model.state.recipe); //update only Text and Attributes in the DOM (this is better)
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  
  //To fill the bookmark button
  recipeView.update(model.state.recipe);
  
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    
    await model.uploadRecipe(newRecipe);
    
    //render added recipe
    recipeView.render(model.state.recipe);
    
    //renedr success message
    addRecipeView.renderMessage();
    
    bookmarkView.render(model.state.bookmarks);
    
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    
    //close form popup
    window.setTimeout(function () {
      addRecipeView.closeWindow();
    }, MODAL_CLOSE_SEC * 1000);
    
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUdpateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

};
init();

/*










*/
// if (module.hot) {
//   module.hot.accept();
// }
