import {useDispatch } from 'react-redux';
import axios from 'axios';

import {setLoading,setRegistrationResult } from '../actions/actions';

export const useIdentificationServices = () => {
    const dispatch = useDispatch();
    const BASE_LINK = 'https://strapi.cleverland.by';

    const axiosRegistrationApi = axios.create({ baseURL: BASE_LINK });


    // eslint-disable-next-line arrow-body-style
    const registrationUser =  (data) => {
        dispatch( setLoading(true))
        
         axiosRegistrationApi.post('/api/auth/local/register', data)
        
            .then (res => {
                dispatch(setRegistrationResult('success'))
            })
            .catch(err => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                (err.response.status === '400') 
                    ? dispatch(setRegistrationResult('error400'))  
                    : dispatch(setRegistrationResult('error'))
            })
            .finally( () => {
                dispatch(setLoading(false));
            });
    }
    
    axiosRegistrationApi.interceptors.request.use((res) => res);

    return {registrationUser}
}