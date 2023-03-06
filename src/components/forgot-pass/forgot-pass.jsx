import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationStep } from '../../actions/actions'
import arrow from '../../resources/icon/arrow.svg'
import arraw_back from '../../resources/icon/arrow-back.svg'

export const ForgotPass = () => {
    const dispatch = useDispatch()
    const [activeInputOne , setActiveInputOne] = useState ('forgot-pass__form-wrapper');

    return  (
        <div className="forgot-pass">
             <Link to='/auth' className="forgot-pass__link"> 
                <img src={arraw_back}  className="forgot-pass__link-icon" alt="arraw" />
                вход в личный кабинет
            </Link>
            <h3 className='forgot-pass__title'> Восстановление пароля </h3>
            
            <form className='forgot-pass__form'>
    
                <div className={activeInputOne}>
                    <label className='forgot-pass__form-label' htmlFor="d"> Email </label>
                    <input id='d' type="text" className='forgot-pass__form-input' 
                    onFocus={()=> setActiveInputOne('forgot-pass__form-wrapper-active')} />
                </div>
                <h5 className='forgot-pass__info'> 
                    На это email будет отправлено письмо с инструкциями <br/> по восстановлению пароля
                </h5>
               
                <input className='forgot-pass__form-submit' type="submit" value="восстановить" />
            </form>
            <div className="forgot-pass__transition">
                <h4 className="forgot-pass__transition-title">Нет учётной записи?</h4>
                <Link to='/registration' onClick={()=> dispatch(setRegistrationStep(1))} className="forgot-pass__transition-link"> Регистрация
                     <img src={arrow}  className="forgot-pass__transition-icon" alt="arrow" />
                </Link>
            </div>
        </div>
    )
}