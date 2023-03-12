import {useState } from 'react';
import { Controller,useForm } from 'react-hook-form'
import {useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InputMask from 'react-text-mask';

import { setRegistrationData,setRegistrationSuccess } from '../../actions/actions';
import arrow from '../../resources/icon/arrow.svg'
import { useIdentificationServices } from '../../services/identification';

export const StepThree = () => {
    const dispatch = useDispatch()
    const registrationData = useSelector(state=> state.identification.registrationData)
    const {registrationUser} = useIdentificationServices()
    const [activeInputOne , setActiveInputOne] = useState ('registration__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('registration__form-wrapper');
    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);

    const {register,handleSubmit,formState: { errors} ,watch,control } = useForm({
        criteriaMode: 'all',
        mode:'onChange',
        defaultValues: { email: ''},
    });
   
    const data = watch();

    const email = register('email', { required: true, pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9.])+\.([A-Za-z]{2,4})$/})

    const onSubmit = (e) => {
        const {phone,email } = data;

        e.preventDefault();
         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         (!phone || phone.includes('x')) && setInpurErrorOne(true);

         // eslint-disable-next-line @typescript-eslint/no-unused-expressions
         (!email) && setInpurErrorTwo(true);

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        if(phone && !phone.includes('x') && !errors.email) {
            dispatch(setRegistrationSuccess(true))
            dispatch(setRegistrationData({phone,email}))
            registrationUser({...registrationData, phone,email})
        }
    }

    const OnBlurInputPhone = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (e.target.value.length < 1 ) && (setActiveInputOne('registration__form-wrapper'), setInpurErrorOne(true))
    }

    const OnBlurInputEmail = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (e.target.value.length < 1) && (setActiveInputTwo('registration__form-wrapper'), setInpurErrorTwo(true));
    }

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (errors.email || inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    return  (
        <div className="registration">
            <h3 className='registration__title'> Регистрация </h3>
            <h4 className="registration__subtitle"> 3 шаг из 3 </h4>
                <form className='registration__form' onSubmit={(e) => handleSubmit(onSubmit(e))} noValidate={true}>
    
                    <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}} >
                        <label className='registration__form-label' htmlFor="phone"> Номер телефона </label>
                            <Controller 
                                className='registration__form-input' 
                                {...register('phone')}
                                control={control}
                                rules={{ pattern: /^((?!х).)*$/ }}
                                render={ ({field})  => (
                                    <InputMask {...register('phone')}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                        (e.target.value.includes('x'))? setInpurErrorOne(true) : setInpurErrorOne(false)
                                    }}
                                    onFocus={()=> {setActiveInputOne('registration__form-wrapper-active');}}
                                    onBlur={(e)=>OnBlurInputPhone(e) }
                                    className='registration__form-input' 
                                    mask={['+', '3','7','5',' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]}
                                    placeholderChar = 'x'
                                    guide={true}/>  
                            )}/>
                    </div> 
                    {(inpurErrorOne)&& <p style={{color:' #F42C4F'}} className='registration__form-help' > В формате +375 (xx) xxx-xx-xx </p>}
               
                    <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                        <label className='registration__form-label' htmlFor="email">E-mail </label>
                        <input type="email" className='registration__form-input' 
                            {...email} 
                            onClick={() => setInpurErrorTwo(false)}
                            onFocus={()=> setActiveInputTwo('registration__form-wrapper-active')}
                            onBlur={(e)=> { OnBlurInputEmail(e)}}
                            onChange={(e)=> {   
                                email.onChange(e);
                            }}/>
                    </div>

                    {(errors.email || inpurErrorTwo) && <p  style={{color:' #F42C4F'}} className='registration__form-help' > Введите корректный e-mail </p>}
              
                    <input className={(inpurErrorOne || (errors.email || inpurErrorTwo)) ? 'registration__form-submit-block' : 'registration__form-submit'} 
                        type="submit" value="зарегистрироваться"
                        disabled= {(inpurErrorTwo || inpurErrorOne) ? true : false }
                        />
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