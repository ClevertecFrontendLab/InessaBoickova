import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationStep } from '../../actions/actions'

export const Authorization = () => {
    const dispatch = useDispatch()
    const [activeInputOne , setActiveInputOne] = useState ('authorization__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('authorization__form-wrapper');

    const {register,handleSubmit,formState: { errors },watch} = useForm({
        shouldUseNativeValidation: false,
        mode:'onBlur'
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if(errors.password || errors.identifier){
            console.log(errors.password,errors.identifier)
        }
        const a = watch();
        console.log(a)
    }

    return  (
        <div className="authorization">
            <h3 className='authorization__title'> Вход в личный кабинет </h3>
            
            <form className='authorization__form' 
             onSubmit= {(e)=> handleSubmit(onSubmit(e))} >
    
                <div className={activeInputOne}>
                    <label className='authorization__form-label' 
                            htmlFor="identifier"> Логин 
                    </label>
                    <input
                        aria-invalid={errors.identifier ? 'true' : 'false'} 
                        {...register('identifier', { required: true, pattern: /^[a-z]*[A-Z]*[0-9]+$/ })}
                        id='identifier' type="text"
                        className='authorization__form-input' 
                        onFocus={()=> setActiveInputOne('authorization__form-wrapper-active')} 
                        onBlur={(e)=> (e.target.value.length < 1) && setActiveInputOne('registration__form-wrapper')}/>
                </div>
               
                <div className={activeInputTwo}>
                    <label className='authorization__form-label' htmlFor="password"> Пароль</label>
                    <input type='password' 
                        aria-invalid={errors.password ? 'true' : 'false'} 
                        {...register('password', { required: true, minLength: 8, 
                            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/})} 
                        id='password'  
                        className='authorization__form-input'
                        onFocus={()=> setActiveInputTwo('authorization__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && setActiveInputTwo('registration__form-wrapper')}/>
                </div>
                <Link to='/forgot-pass' className="authorization__form-link" > Забыли логин или пароль? </Link>
              
                <input className='authorization__form-submit' type="submit" value="вход" />
            </form>
            <div className="authorization__transition">
                <h4 className="authorization__transition-title">Нет учётной записи?</h4>
                <Link to='/registration' onClick={()=> dispatch(setRegistrationStep(1))} className="authorization__transition-link"> Регистрация</Link>
            </div>
        </div>
    )
}