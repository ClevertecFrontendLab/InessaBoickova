import {useDispatch } from 'react-redux';
import axios from 'axios'; 

import { setBook,setBooksList,setError,setListOfGenres,setLoading} from '../actions';

export const useService = () => {
    const link = 'https://strapi.cleverland.by/';
    const dispatch = useDispatch();

    const onRequest = (action,ref) => {
        dispatch(setLoading(true));
        axios.get(`${link}${ref}`)
        .then((response) =>  {
            dispatch(action(response.data))
        })
        .catch(()=> {
            dispatch(setError(true));
        })
        .finally( () => {
            dispatch(setLoading(false));
        });
    }

    const getBooksList = () => {
       onRequest(setBooksList,'api/books')
    }

    const getBook = (id) => {
        onRequest(setBook,`api/books/${id}`)
    }
    const getListOfGenres = () => {
        onRequest(setListOfGenres,'api/categories')
    }

    return {getBooksList,getListOfGenres,getBook}
}