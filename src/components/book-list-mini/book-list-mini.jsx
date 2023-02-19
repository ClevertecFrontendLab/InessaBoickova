import { useSelector } from 'react-redux';

export const BookListMini = () => {
    const book = useSelector(state=> state.book);
    const error = useSelector(state=> state.error);

    return (
        <div className='list-mini'>
            <div className="container">
                <div className="list-mini__wrapper">
                    <h4>{error ?  'Все книги' :  book.categories}
                        <span>
                            <svg width="11" height="16" viewBox="0 0 11 20" fill="none">
                                <path d="M1 19L10 1" stroke="#BFC4C9" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </span>
                        {(error)?  ' ' :  book.title}
                    </h4>
                </div>
            </div>
        </div>
    )
}