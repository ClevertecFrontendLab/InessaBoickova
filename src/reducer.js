const initialState = {
  style: 'book-column',
  navMenuOpen: false,
  showListBook: true,
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
      default : 
        return state;
    }
}
