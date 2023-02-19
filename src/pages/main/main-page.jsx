import { useSelector } from 'react-redux';

import { BookList } from '../../components/book-list/book-list';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MainFilter } from '../../components/main-filter/main-filter';
import { NavMenu } from '../../components/nav-menu/nav-menu';

export const MainPage = () => {
    const error = useSelector(state=> state.error);

    return (
        <div className='main-page'>
            <Header/>
            {error ? <ErrorMessage/> : null}
            <div className="main-page__content">
                <div className="container">
                    <NavMenu/>
                    {error
                        ? null
                        :  <div className="main-page__content-block">
                                <MainFilter/>
                                <BookList/>
                            </div> }
                </div>
            </div>
            <Footer/>
        </div>
    )
};
