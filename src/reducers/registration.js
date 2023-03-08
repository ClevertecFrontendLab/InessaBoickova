const initialState = {
    registrationStep: 1,
    registrationData: {},
    registrationResult: '',
    registrationSuccess: false
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
        case 'SET_REGISTRATOIN_RESULT': 
            return {
                ...state,
                registrationResult: action.value,
            };
        case 'SET_REGISTRATOIN_SUCCESS':
            return {
                ...state,
                registrationSuccess: action.value
            }
        default : 
            return state;
    }
}