const initialState = {
  style: 'book-column',
  navMenuOpen: false,
  showListBook: true,
  booksList : [],
  book: [],
  listOfGenres: [],
  loading : false,
  error: false,
}

export const reducer = (state = initialState, action) => {
 
    switch (action.type){
      case 'COLUMN': 
        return {
            ...state,
            style: 'book-column'
        };
      case 'ROW':
        return {
            ...state,
            style: 'book-row'
        };
        case 'NAV_MENU_OPEN': 
        return {
            ...state,
            navMenuOpen: !state.navMenuOpen 
        };
        case 'SHOW_LIST_MENU': 
        return {
            ...state,
            showListBook: !state.showListBook 
        };
        case 'HIDE_LIST_MENU': 
        return {
            ...state,
            showListBook: false
        };
        case 'SET_BOOKS_LIST': 
        return {
            ...state,
            booksList :  action.value
        };
        case 'SET_BOOK': 
        return {
            ...state,
            book : action.value
        };
        case 'SET_LIST_OF_GENRES': 
        return {
            ...state,
            listOfGenres : action.value
        };
        case 'SET_LOADING': 
        return {
            ...state,
            loading : action.value
        };
        case 'SET_ERROR': 
        return {
            ...state,
            error : action.value
        };
      default : 
        return state;
    }
}
