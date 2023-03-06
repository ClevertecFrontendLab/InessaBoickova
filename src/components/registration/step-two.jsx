import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationStep } from '../../actions/actions'
import arrow from '../../resources/icon/arrow.svg'

export const StepTwo = () => {
    const dispatch = useDispatch();
    const [activeInputOne , setActiveInputOne] = useState ('registration__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('registration__form-wrapper');

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(setRegistrationStep(3))
    }

    const {register,handleSubmit,formState: { errors } ,watch} = useForm({
        mode:'onChange',
        shouldUseNativeValidation: false 
    });

    return  (
        <div className="registration"  onSubmit={(e) => onSubmit(e)}>
            <h3 className='registration__title'> Регистрация </h3>
            <h4 className="registration__subtitle"> 2 шаг из 3 </h4>
            
            <form className='registration__form'>
    
                <div className={activeInputOne}>
                    <label className='registration__form-label' htmlFor="firstName"> Имя </label>
                    <input type="text" className='registration__form-input' 
                        {...register('firstName', { required: true, minLength: 8, 
                            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/})} 
                        onFocus={()=> setActiveInputOne('registration__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && setActiveInputOne('registration__form-wrapper')}/> 
                </div>
               
                <div className={activeInputTwo}>
                    <label className='registration__form-label' htmlFor="lastName"> Фамилия</label>
                    <input type="text" className='registration__form-input'
                        {...register('lastName', { required: true, minLength: 8, 
                            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/})} 
                        onFocus={()=> setActiveInputTwo('registration__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && setActiveInputTwo('registration__form-wrapper')}/>
                </div>
              
                <input className='registration__form-submit' type="submit" value="последний шаг" />
            </form>
            <div className="registration__transition">
                <h4 className="registration__transition-title">Есть учётная запись?</h4>
                <Link to='/auth' className="registration__transition-link"> войти 
                    <img src={arrow}  className="registration__transition-icon" alt="arrow" />
                </Link>
            </div>
        </div>
    )
}