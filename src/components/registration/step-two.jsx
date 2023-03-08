import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationData,setRegistrationStep } from '../../actions/actions'
import arrow from '../../resources/icon/arrow.svg'

export const StepTwo = () => {
    const dispatch = useDispatch();
    const [activeInputOne , setActiveInputOne] = useState ('registration__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('registration__form-wrapper');

    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    const {register, handleSubmit ,watch} = useForm({
        mode:'onChange',
        shouldUseNativeValidation: false ,
        defaultValues: { firstName: '', lastName: ''},
    });
    const data = watch();

    const onSubmit = (e) => {
        e.preventDefault();
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         (!data.firstName) && setInpurErrorOne(true);
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         (!data.lastName) && setInpurErrorTwo(true);
        // dispatch(setRegistrationStep(3))

        if(data.firstName && data.lastName){
            dispatch(setRegistrationStep(3));
            dispatch(setRegistrationData(data))
        }
    }

    return  (
        <div className="registration"  onSubmit={(e) => onSubmit(e)}>
            <h3 className='registration__title'> Регистрация </h3>
            <h4 className="registration__subtitle"> 2 шаг из 3 </h4>
            
            <form className='registration__form'  onSubmit={(e) => handleSubmit(onSubmit(e))}>
    
                <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}}>
                    <label className='registration__form-label' htmlFor="firstName"> Имя </label>
                    <input type="text" className='registration__form-input' 
                        {...register('firstName', { required: true, minLength: 1, 
                            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])/})} 
                            onClick={() => setInpurErrorOne(false)}
                        onFocus={()=> setActiveInputOne('registration__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && (setActiveInputOne('registration__form-wrapper'),setInpurErrorOne(true))}/> 
                </div>
                {inpurErrorOne && <p className='registration__form-help' style={{color:' #F42C4F'}}> Поле не может быть пустым</p>}
               
                <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                    <label className='registration__form-label' htmlFor="lastName"> Фамилия</label>
                    <input type="text" className='registration__form-input'
                        {...register('lastName', { required: true})} 
                        onClick={() => setInpurErrorTwo(false)}
                        onFocus={()=> setActiveInputTwo('registration__form-wrapper-active')}
                        onBlur={(e)=> (e.target.value.length < 1) && (setActiveInputTwo('registration__form-wrapper'), setInpurErrorTwo(true))}/>
                </div>
                {inpurErrorTwo && <p className='registration__form-help' style={{color:' #F42C4F'}}> Поле не может быть пустым</p>}
              
                <input className={(inpurErrorTwo || inpurErrorOne) ? 'registration__form-submit-block' : 'registration__form-submit'}
                    type="submit" value="последний шаг" 
                    disabled= {(inpurErrorTwo || inpurErrorOne) ? true : false }/>
            </form>
            <div className="registration__transition" >
                <h4 className="registration__transition-title">Есть учётная запись?</h4>
                <Link to='/auth' className="registration__transition-link"> войти 
                    <img src={arrow}  className="registration__transition-icon" alt="arrow" />
                </Link>
            </div>
        </div>
    )
}