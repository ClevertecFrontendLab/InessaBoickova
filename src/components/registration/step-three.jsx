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
    const [activeInputOne , setActiveInputOne] = useState ('identification__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('identification__form-wrapper');
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
        (e.target.value.length < 1 ) && (setActiveInputOne('identification__form-wrapper'), setInpurErrorOne(true))
    }

    const OnBlurInputEmail = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (e.target.value.length < 1) && (setActiveInputTwo('identification__form-wrapper'), setInpurErrorTwo(true));
    }

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (errors.email || inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    return  (
        <div className="identification">
            <h3 className='identification__title'> ?????????????????????? </h3>
            <h4 className="identification__subtitle"> 3 ?????? ???? 3 </h4>
                <form className='identification__form' onSubmit={(e) => handleSubmit(onSubmit(e))} noValidate={true} data-test-id='register-form'>
    
                    <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}} >
                        <label className='identification__form-label' htmlFor="phone"> ?????????? ???????????????? </label>
                            <Controller 
                                className='identification__form-input' 
                                {...register('phone')}
                                control={control}
                                rules={{ pattern: /^((?!??).)*$/ }}
                                render={ ({field})  => (
                                    <InputMask {...register('phone')}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                        (e.target.value.includes('x'))? setInpurErrorOne(true) : setInpurErrorOne(false)
                                    }}
                                    onFocus={()=> {setActiveInputOne('identification__form-wrapper-active');}}
                                    onBlur={(e)=>OnBlurInputPhone(e) }
                                    className='identification__form-input' 
                                    mask={['+', '3','7','5',' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/]}
                                    placeholderChar = 'x'
                                    guide={true}/>  
                            )}/>
                    </div> 
                    {(inpurErrorOne)&& <p data-test-id='hint' style={{color:' #F42C4F'}} className='identification__form-help' >{data.phone 
                                                                                        ? ' ?? ?????????????? +375 (xx) xxx-xx-xx'
                                                                                        : '???????? ???? ?????????? ???????? ????????????'} </p>}
                    {data.phone && !inpurErrorOne && <p data-test-id='hint' className='identification__form-help' >
                                                        ?? ?????????????? +375 (xx) xxx-xx-xx
                                                    </p> }
               
                    <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                        <label className='identification__form-label' htmlFor="email">E-mail </label>
                        <input type="email" className='identification__form-input' id='email'
                            {...email} 
                            onClick={() => setInpurErrorTwo(false)}
                            onFocus={()=> setActiveInputTwo('identification__form-wrapper-active')}
                            onBlur={(e)=> { OnBlurInputEmail(e)}}
                            onChange={(e)=> {   
                                email.onChange(e);
                            }}/>
                    </div>

                    {(errors.email || inpurErrorTwo) && <p data-test-id='hint'  
                                            style={{color:' #F42C4F'}} className='identification__form-help' > 
                                                                {data.email 
                                                            ? '?????????????? ???????????????????? e-mail'
                                                            : '???????? ???? ?????????? ???????? ????????????'} 
                                                         </p>}
              
                    <input className={(inpurErrorOne || (errors.email || inpurErrorTwo)) 
                                    ? 'identification__form-submit-block' 
                                    : 'identification__form-submit'} 
                        type="submit" value="????????????????????????????????????"
                        disabled= {(inpurErrorTwo || inpurErrorOne) ? true : false }/>
                </form>
                <div className="identification__transition">
                    <h4 className="identification__transition-title">???????? ?????????????? ?????????????</h4>
                    <Link to='/auth' className="identification__transition-link"> ?????????? 
                        <img src={arrow}  className="identification__transition-icon" alt="arrow" />
                    </Link>
                </div>
            </div>
        )
    }