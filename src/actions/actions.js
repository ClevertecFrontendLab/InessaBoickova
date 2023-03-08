export const setColumn = () => ({type:'COLUMN'});
export const setRow = () => ({type:'ROW'});
export const openNavMenu = ()=> ({type:'NAV_MENU_OPEN'});
export const showListMenu = ()=> ({type:'SHOW_LIST_MENU'});
export const hideListMenu = ()=> ({type:'HIDE_LIST_MENU'});
export const setBooksList = (value)=> ({type:'SET_BOOKS_LIST' , value});
export const setBook = (value)=> ({type:'SET_BOOK' , value});
export const setListOfGenres = (value)=> ({type:'SET_LIST_OF_GENRES' , value});
export const setLoading = (value)=> ({type:'SET_LOADING' , value});
export const setError = (value)=> ({type:'SET_ERROR' , value});
export const setActiveFilter = (value)=> ({type:'SET_ACTIVE_FILTER' , value});
export const setRaiseFilter = (value)=> ({type:'SET_RAISE_FILTER' , value});
export const setValueInput = (value)=> ({type:'SET_VALUE_INPUT' , value});

export const setRegistrationStep = (value)=> ({type:'SET_REGISTRATION_STEP' , value});
export const setRegistrationData = (value) => ({type:'SET_REGISTRATION_DATA', value});
export const setRegistrationResult = (value) => ({type: 'SET_REGISTRATOIN_RESULT', value})
export const setRegistrationSuccess = (value) => ({type: 'SET_REGISTRATOIN_SUCCESS',value})
