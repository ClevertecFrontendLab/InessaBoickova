/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {openNavMenu} from '../../actions'
import user from '../../resources/icon/avatar.png';
import logo from '../../resources/icon/logo.png';

export const Header = () => {
        const dispatch = useDispatch();
        const navMenuOpen = useSelector(state=> state.navMenuOpen);

        const disableScrolling = ()=> {
                const x = window.scrollX;
                const y = window.scrollY;
        
                window.onscroll=() =>{window.scrollTo(x, y);};
        }
        
        const enableScrolling = () => {
                window.onscroll= () => {};
        }
        
        if (navMenuOpen){
                disableScrolling();
        }else {
                enableScrolling();
        }

        const showNavMenu = () => {
                dispatch(openNavMenu());
        }

        return (
                <header className='header'>
                        <div className="container">

                                <div className="header__wrapper" >
                                        <div data-test-id='button-burger' className={classNames('header__hamburger', {header__hamburger_visible : navMenuOpen})} tabIndex="0" role="button" onClick={(e)=> showNavMenu(e)}>
                                                <span> </span>
                                                <span> </span>
                                                <span> </span>
                                        </div>

                                        <div className='header__logo' >
                                                <Link to='/books/all'>
                                                        <img src={logo} alt="logo" className='header__logo-img' />
                                                </Link>
                                        </div>

                                        <div className="header__title">
                                                <h1>Библиотека</h1>
                                        </div>

                                        <div className="header__user">
                                                <h3>Привет, Иван!</h3>
                                                <img src={user} alt="user" />
                                        </div>

                                </div>
                        </div>
                </header>
        )
};


