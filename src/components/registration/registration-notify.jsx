import { Fragment } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {setRegistrationResult,setRegistrationStep,setRegistrationSuccess} from '../../actions/actions'
import { useIdentificationServices } from '../../services/identification';

export const RegistrationNotify = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.registration.registrationResult);
    const registrationData = useSelector(state=> state.registration.registrationData);
    const {registrationUser} = useIdentificationServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = {
        success: {
           title: 'Регистрация успешна',
           descr: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
           textBtn: 'вход',
           link: '/auth'
        },
        error400:{
            title: 'Данные не сохранились',
            descr: 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
            textBtn: 'назад к регистрации',
            link: '/registration'
        },
        error:{
            title: 'Данные не сохранились',
            descr: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
            textBtn: 'повторить',
            link: '/registration'
        }
    }

    const onClean= ()=> {
        // eslint-disable-next-line no-negated-condition
        if(status !== 'error'){
            dispatch(setRegistrationResult(''));
            dispatch(setRegistrationSuccess(false));
            dispatch(setRegistrationStep(1))
        }else {
            registrationUser(registrationData)
        }
    }

    // eslint-disable-next-line consistent-return
    const elem = () => {
       if(status !== ''){
        const {title,descr,textBtn,link} = data[status];

        return (
            <div className="registration-notify">
                <h2 className="registration-notify__title"> {title}</h2>
                <p className="registration-notify__descr"> {descr} </p>
                <Link to={link} className="registration-notify__button" onClick={()=> onClean()}> {textBtn} </Link>

            </div>
            )
        }
    }
    
    return (
        <Fragment>
            {elem()}
        </Fragment>
    )

}