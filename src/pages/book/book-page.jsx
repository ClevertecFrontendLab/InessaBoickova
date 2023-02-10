import { Book } from '../../components/book/book';
import { BookListMini } from '../../components/book-list-mini/book-list-mini';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { NavMenu } from '../../components/nav-menu/nav-menu';

export const BookPage = () => (
    <section className='book-page'>
        <NavMenu/>
        <div className="book-page__headers">
            <Header/>
            <BookListMini/>
        </div>
        <Book/>
       <Footer/>
    </section>
);
