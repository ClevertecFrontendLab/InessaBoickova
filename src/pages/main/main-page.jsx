import { useSelector } from 'react-redux';

import { BookList } from '../../components/book-list/book-list';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MainFilter } from '../../components/main-filter/main-filter';
import { NavMenu } from '../../components/nav-menu/nav-menu';


export const MainPage = () => {
    const error = useSelector(state=> state.error);
    const loading = useSelector(state=> state.loading);

    return (
        <div className='main-page'>
            <Header/>
            {error ? <ErrorMessage/> : null}
            <div className="main-page__content">
                <div className="container">
                    <NavMenu/>
                    <div className="main-page__content-block">
                                {(error || loading ? null :  <MainFilter/>)}
                                <BookList/>
                    </div> 
                </div>
            </div>
            <Footer/>
        </div>
    )
};
