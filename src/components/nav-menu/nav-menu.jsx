import { useEffect, useRef } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import {hideListMenu,openNavMenu,showListMenu} from '../../actions'
import close_vector from '../../resources/icon/close_vector.svg';
import raise_vector from '../../resources/icon/raise_vector.svg';
import { useService } from '../../services/services';

export const NavMenu = () => {
    const navMenuOpen = useSelector(state => state.navMenuOpen);
    const showListBook = useSelector(state => state.showListBook);
    const listOfGenres = useSelector(state => state.listOfGenres);
    const ref = useRef();
    const location = useLocation();
   
    const dispatch = useDispatch();
    const {getListOfGenres} = useService();

    useEffect (()=> {
        getListOfGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect (()=> {
        if ( location.pathname !== '/books' &&  location.pathname !== '/books/all'){
            dispatch(hideListMenu());
        }
    },[dispatch, location])
    
    useEffect(()=> {
        
        const checkIfClickedOutside = (e) => {
            e.preventDefault();

            if (navMenuOpen && !ref.current.contains(e.target) && !e.target.closest('.header__hamburger')) {
                dispatch(openNavMenu())
            }
            if (e.target.tagName === 'P') {
                dispatch(openNavMenu())
            } 
        };
       
        document.addEventListener('click' , checkIfClickedOutside);
        
        return () => {
            document.removeEventListener('click' , checkIfClickedOutside);
        }
   
    },[dispatch, navMenuOpen]);

    const testShowcase = (window.innerWidth < 769) ? 'burger-showcase' : 'navigation-showcase';
    const testTerms =(window.innerWidth < 769) ? 'burger-terms': 'navigation-terms';
    const testContract= (window.innerWidth < 769) ? 'burger-contract' : 'navigation-contract' ;
    const testAllBooks = (window.innerWidth < 769) ? 'burger-books' : 'navigation-books' ;
    

    const list = listOfGenres.map((i)=> (
            <li key={i.id}>
                <NavLink  className={({isActive}) => isActive ? 'active__link': 'menu__link '} 
                to={`/books/${i.path}`}>
                    <p> {i.name} </p>
                </NavLink>
            </li>
        ))        

    return (
        <section className={classNames('menu', {visible : navMenuOpen})} ref={ref} data-test-id='burger-navigation' >
            <ul className='menu__list' > 
                   
                <div className='menu__list-wrap'>
                    <NavLink to='/books' className={({isActive}) => isActive ? 'active_link' : 'menu__link-main'}>
                        Витрина книг
                        <button  data-test-id= {testShowcase} type='button' onClick={()=> dispatch(showListMenu())} className = 'menu__btn' ><img  src={showListBook ? close_vector :  raise_vector} alt="vector" 
                            className='menu__vector'/>
                    </button>
                    </NavLink> 
                </div>

                <div className={classNames('menu_list_hide', {menu_list_hide_visible : showListBook})}>
                
                    {list.length > 3 ? [<li key= {list.length + 1}>
                        <NavLink data-test-id={testAllBooks} className={({isActive}) => isActive ? 'active__link': 'menu__link '} 
                            to="/books/all">
                            <p> Все книги</p>
                        </NavLink>
                    </li>, ...list]
                      : null}

                </div>         
            
                <li className='menu__link-mt' >
                    <NavLink data-test-id={testTerms}  to='/terms'
                    className={({isActive}) => isActive ? 'active_link': 'menu__link-main' }>
                        Правила пользования
                    </NavLink>
                </li>
                <li>
                    <NavLink data-test-id={testContract} to='/contract'
                    className={({isActive}) => isActive ? 'active_link' : 'menu__link-main'}>
                       Договор оферты
                    </NavLink>
                </li>

               <div className="menu__hide">
                    <li >
                        <NavLink to='/profile'
                            className={({isActive}) => isActive ? 'menu__link-main': 'menu__link-main' }>
                             Профиль
                        </NavLink>
                    </li>

                    <li className='menu__hide_link'>
                        <NavLink to='/exit'
                            className={({isActive}) => isActive ? 'menu__link-main' : 'menu__link-main'}>
                                Выход
                        </NavLink>
                    </li>
               </div>

            </ul>
        </section>
    )
}