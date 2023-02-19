export const column = () => ({type:'COLUMN'});
export const row = () => ({type:'ROW'});
export const openNavMenu = ()=> ({type:'NAV_MENU_OPEN'});
export const showListMenu = ()=> ({type:'SHOW_LIST_MENU'});
export const hideListMenu = ()=> ({type:'HIDE_LIST_MENU'});
export const setBooksList = (value)=> ({type:'SET_BOOKS_LIST' , value});
export const setBook = (value)=> ({type:'SET_BOOK' , value});
export const setListOfGenres = (value)=> ({type:'SET_LIST_OF_GENRES' , value});
export const setLoading = (value)=> ({type:'SET_LOADING' , value});
export const setError = (value)=> ({type:'SET_ERROR' , value});

