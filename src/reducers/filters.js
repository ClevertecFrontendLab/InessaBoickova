const initialState = {
    activeFilter: 'Все',
    filteredBookList: [],
    raiseFilter : false
}
  
export const filters = (state = initialState, action) => {

    switch (action.type){
        case 'SET_ACTIVE_FILTER': 
            return {
                ...state,
                activeFilter : action.value,
            };
        case 'SET_RAISE_FILTER': 
        return {
            ...state,
            raiseFilter : !state.raiseFilter,
        };
        default : 
            return state;
    }
}
  