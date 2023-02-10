import { BookList } from '../../components/book-list/book-list';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { MainFilter } from '../../components/main-filter/main-filter';
import { NavMenu } from '../../components/nav-menu/nav-menu';

export const MainPage = () => (
    <div className='main-page'>
        <Header/>
        <div className="main-page__content">
            <div className="container">
                <NavMenu/>
                <div className="main-page__content-block">
                    <MainFilter/>
                    <BookList/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
);
