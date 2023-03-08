/* eslint-disable array-callback-return */
import {useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { setRegistrationData,setRegistrationStep} from '../../actions/actions'
import arrow from '../../resources/icon/arrow.svg'
import eye_open from '../../resources/icon/eye_open.svg'
import eye_closed from '../../resources/icon/eye-closed.svg'
import successful_сheck from '../../resources/icon/successful-сheck.svg'

export const StepOne = () => {
    const dispatch = useDispatch()
   
    const [activeInputOne , setActiveInputOne] = useState ('registration__form-wrapper');
    const [activeInputTwo , setActiveInputTwo] = useState ('registration__form-wrapper');

    const [inpurErrorOne,setInpurErrorOne] = useState(false);
    const [inpurErrorTwo,setInpurErrorTwo] = useState(false);
    const [showPassword , setShowPassword] = useState(false);

    const borderOneColor = (inpurErrorOne) ? '#F42C4F' : '#BFC4C9' ;
    const borderTwoColor = (inpurErrorTwo) ? '#F42C4F' : '#BFC4C9' ;

    const {register,handleSubmit,formState: { errors } ,watch} = useForm({
        criteriaMode: 'all',
        mode:'onChange',
        defaultValues: { username: '', password: ''},
    });
    const data = watch();

    const username = register('username', { required: true,
                                validate:{
                                    onlyString: (value) => /(?=.*?[A-Za-z])/.test(value) || 'латинский алфавит',
                                    onlyNumber: (value) => /(?=.*?[0-9])/.test(value) || 'и цифры',
                                    }
                                }
                            )

    const password = register('password', { required: true, 
                                validate: {
                                    onLength  : (value) => /(?=^.{8,}$)/.test(value) || 'не менее 8 символов,',
                                    onlyUppercase: (value) => /(?=.*?[A-Z])/.test(value) || 'с заглавной буквой',
                                    onlyNumber: (value) => /(?=.*?[0-9])/.test(value) || 'и цифрой',
                                    }
                                }
                            )
  
    const onSubmit = (e) => {
        e.preventDefault();
        if(!errors.password && !errors.username && data.password && data.username){
            dispatch(setRegistrationStep(2));
            dispatch(setRegistrationData(data))
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!data.password) && setInpurErrorTwo(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (!data.username) && setInpurErrorOne(true);
    }
 
    const onBlurUserName = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (errors.username || e.target.value === '' )
                            ? setInpurErrorOne(true)
                            : setInpurErrorOne(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
        (e.target.value !== '') ? setActiveInputOne('registration__form-wrapper-active')
                                : setActiveInputOne('registration__form-wrapper')
    }

    const onBlurPassword = (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (errors.username || e.target.value === '' )
                            ? setInpurErrorTwo(true)
                            : setInpurErrorTwo(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
        (e.target.value !== '') ? setActiveInputTwo('registration__form-wrapper-active')
                                : setActiveInputTwo('registration__form-wrapper')
    }

    const setErrorText= (string,type) => {
        let str = string;
        const {types} = (type)? type : {types: ''};
        const arr = [];

        // eslint-disable-next-line no-restricted-syntax, guard-for-in, no-unreachable-loop
        for ( const [,value] of Object.entries(types)) {
            arr.push(value)
            str = str.replace(value, 'errors');
        }

        return {str,arr};
    }

    const onChangeUserName= (()=> setErrorText('Используйте для логина латинский алфавит и цифры', errors.username))

    const onChangePassword = (()=> setErrorText('Пароль не менее 8 символов, с заглавной буквой и цифрой', errors.password))

    const userNameErorr = onChangeUserName();
    const passwordErorr = onChangePassword();

    const {str: strUser , arr: arrUser} = userNameErorr;
    const {str: strPassword , arr: arrPassword} = passwordErorr;

    let countUser = 0;
    let countPassword = 0;

    return  (
        <div className="registration">
            <h3 className='registration__title'> Регистрация </h3>
            <h4 className="registration__subtitle"> 1 шаг из 3 </h4>
            
            <form className='registration__form' 
                onSubmit={(e) => handleSubmit(onSubmit(e))}>
    
                <div className={activeInputOne} style={{borderBottom:`1px solid ${borderOneColor}`}} >
                    <label className='registration__form-label'
                            htmlFor="username">
                         Придумайте логин для входа 
                    </label>
                    <input type="text" 
                        {...username}
                            className='registration__form-input' 
                            onClick={() => setInpurErrorOne(false)}
                            onFocus={()=> setActiveInputOne('registration__form-wrapper-active')}
                            onBlur={(e)=> onBlurUserName(e)}
                            onChange={(e)=> {
                                username.onChange(e)
                                onChangeUserName(e)
                        }}/>
                
                </div>
                        
                    {inpurErrorOne 
                        ? <p className='registration__form-help' style={{color:' #F42C4F'}}> Используйте для логина  латинский алфавит и цифры</p>
                        : <p className='registration__form-help'>
                            { strUser.split(' ').map((i) => {
                                   const key = Math.random();

                                    // eslint-disable-next-line no-return-assign
                                    return (i === 'errors') ? (countUser = 1 + countUser, <span key ={key} style={{color:' #F42C4F'}} > {arrUser[countUser -1]} </span>): ` ${i}`
                            })}
                        </p>
                    }
  
                <div className={activeInputTwo} style={{borderBottom:`1px solid ${borderTwoColor}`}}>
                    <label className='registration__form-label' 
                    htmlFor="password"> Пароль</label>
                    <input type={showPassword ? 'text' : 'password'}
                        className='registration__form-input' 
                            {...password} 
                        onClick={() => setInpurErrorTwo(false)}
                        onFocus={()=> setActiveInputTwo('registration__form-wrapper-active')}
                        onBlur={(e)=> onBlurPassword(e)}
                        onChange={(e)=> {
                            password.onChange(e);
                            onChangePassword()
                        }}/>

                       {
                        (!errors.password && data.password.length !== 0)
                            && <img className='registration__form-successful_сheck' src={successful_сheck} alt="successful сheck" /> 
                       }
                        
                        <button className='registration__form-button_show' type='button' 
                            onClick={()=> setShowPassword(!showPassword)}>
                            <img src={(showPassword)? eye_open :  eye_closed} alt="eye"/>
                        </button>
                </div>

                {inpurErrorTwo
                        ? <p className='registration__form-help' style={{color:' #F42C4F'}}> Пароль не менее 8 символов , с заглавной буквой и цифрой</p>
                        : <p className='registration__form-help'>
                            { strPassword.split(' ').map((i) => {
                        
                                   const key = Math.random();

                                    // eslint-disable-next-line no-return-assign
                                    return (i.includes('errors')) ? ( countPassword += 1, <span key ={key} style={{color:' #F42C4F'}} > { arrPassword[countPassword -1 ]} </span> ) : ` ${i}`
                            })}
                        </p>
                    }
               
                <input 
                    className={(errors.password || errors.username)? 'registration__form-submit-block' : 'registration__form-submit'} 
                    type="submit" value="следующий шаг"
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