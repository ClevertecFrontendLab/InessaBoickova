import { useSelector } from 'react-redux';

import { Book } from '../../components/book/book';
import { BookListMini } from '../../components/book-list-mini/book-list-mini';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { NavMenu } from '../../components/nav-menu/nav-menu';

export const BookPage = () => {
    const error = useSelector(state=> state.error);
    
    return (
        <section className='book-page'>
            <NavMenu/>
            <div className="book-page__headers">
                <Header/>
                <BookListMini/>
            </div>
            {error ? <ErrorMessage/> :  <Book/>  }
            <Footer/>
        </section>
    )
};

