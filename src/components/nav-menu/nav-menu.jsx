import {useEffect, useRef } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { NavLink , useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { createSelector } from 'reselect';

import {hideListMenu,openNavMenu,setActiveFilter,showListMenu} from '../../actions/actions'
import close_vector from '../../resources/icon/close_vector.svg';
import raise_vector from '../../resources/icon/raise_vector.svg';
import { useService } from '../../services/services';

export const NavMenu = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navMenuOpen = useSelector(state => state.listMenu.navMenuOpen);
    const showListBook = useSelector(state => state.listMenu.showListBook);
    const loading = useSelector(state => state.book.loading);
    const error = useSelector(state => state.book.error);
    const ref = useRef();
    const {getListOfGenres} = useService();

    const listSelector = createSelector(
        (state) => state.book.booksList,
        (state) => state.book.listOfGenres,
        (booksList , listOfGenres) => {
            const arr = booksList.map((item) => item.categories)
            // eslint-disable-next-line no-return-assign, no-param-reassign, no-sequences
            const list = arr.flat(3).reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
            // eslint-disable-next-line padding-line-between-statements, array-callback-return
            const result = listOfGenres.map((i)=> ({
                    ...i,
                    number: list[i.name],
                }))

            return result; 
        }
      )

    const ListOfGenres = useSelector(listSelector);

    useEffect (()=> {
        getListOfGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    useEffect (()=> {
        if ( location.pathname !== '/books' && window.innerWidth < 769 && !error ){
            dispatch(hideListMenu());
            dispatch(openNavMenu());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch, loading, location])

    useEffect(()=> {
        
        const checkIfClickedOutside = (e) => {
            e.preventDefault();

            if (navMenuOpen && !ref.current.contains(e.target) && !e.target.closest('.header__hamburger') && !(window.innerWidth < 769)) {
                dispatch(openNavMenu());
            }
            if ((e.target.tagName === 'P') && (window.innerWidth < 769)) {
                dispatch(openNavMenu());
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
   
    const list = ListOfGenres.map((i)=>{
        const {name,path,number} = i;
        
        return  (
            <li key={name}>
                <NavLink  className={({isActive}) => isActive ? 'active__link': 'menu__link '} onClick={()=> dispatch(setActiveFilter(name))}
                to={`/books/${path}`}>
                    <p> <span className='menu__name'
                    data-test-id = {((window.innerWidth < 769)) 
                                        ?`burger-${path}`
                                        : `navigation-${path}`}>{name}
                        </span> 
                        <span  data-test-id ={((window.innerWidth < 769)) 
                                ? `burger-book-count-for-${path}` 
                                : `navigation-book-count-for-${path}`}>
                                {number ? number : 0}
                        </span>
                    </p>  
                </NavLink>
            </li>
        )
    })
   
    return (
        <section className={classNames('menu', {visible : navMenuOpen})} ref={ref} data-test-id='burger-navigation' >
            <ul className='menu__list' > 
                   
                <div className='menu__list-wrap'>
                    <NavLink to='/books' className={({isActive}) => isActive ? 'active_link' : 'menu__link-main'}>
                        Витрина книг
                    </NavLink> 
                    <button  data-test-id= {testShowcase} type='button' onClick={()=> dispatch(showListMenu())} className = 'menu__btn' >
                        <img  src={showListBook ? close_vector :  raise_vector} alt="vector" 
                            className='menu__vector'/>
                    </button>
                </div>

                <div className={classNames('menu_list_hide', {menu_list_hide_visible : showListBook})}>
                
                    {list.length > 3 ? [<li key= {list.length + 1}>
                        <NavLink  className={({isActive}) => isActive ? 'active__link': 'menu__link '} 
                            to="/books/all" onClick={()=> dispatch(setActiveFilter('Все книги'))}>
                            <p> <span data-test-id={testAllBooks} className='menu__name'>{'Все книги'.trim()}</span></p>
                        </NavLink>
                    </li>, ...list]
                      : null}

                </div>         
            
                <li className='menu__link-mt menu__link-main' >
                    <NavLink data-test-id={testTerms}  to='/terms'
                    className={({isActive}) => isActive ? 'active_link': 'menu__link-main' }>
                        Правила пользования
                    </NavLink>
                </li>
                <li className='menu__link-main'>
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