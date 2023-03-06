const initialState = {
    registrationStep: 1,
    registrationData: {}
}
  
export const registration = (state = initialState, action) => {
   
    switch (action.type){
        case 'SET_REGISTRATION_STEP': 
            return {
                ...state,
                registrationStep: action.value
            };
        case 'SET_REGISTRATION_DATA': 
            return {
                ...state,
                registrationData: {
                    ...state.registrationData,
                    ...action.value,
                }
            };
        default : 
            return state;
    }
}